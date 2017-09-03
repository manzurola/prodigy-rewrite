/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions,
    LayoutAnimation,
    UIManager
} from "react-native";
import TimerMixin from "react-timer-mixin";
import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import Answer from "./Answer";
import Choice from "./Choice";
import Feedback from "./Feedback";
let reactMixin = require('react-mixin');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CustomLayoutSpring = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.8,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.5,
    },
};

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            answerComplete: false,
            choiceIndex: 0,
            answer: [],
            progress: 0,
            score: 0,
            combo: 0,
            playingFeedback: false,
        };
        this.evaluation = {};
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: SCREEN_HEIGHT / 10,
                }}>
                    <ProgressBar progress={this.state.progress} barWidth={SCREEN_WIDTH * 4 / 5}/>
                </View>
                <View style={{
                    height: (SCREEN_HEIGHT / 10) * 6,
                    padding: 10,
                    justifyContent: 'flex-end',
                }}>
                    <Sentence text={this.getCurrentQuestion().sentence}/>
                    <Answer answer={this.getCurrentQuestion().answer}
                            input={this.state.answer}
                            instructions={this.getCurrentQuestion().instructions}
                            onPress={() => this.onAnswerPress()}
                            onComplete={(result) => this.onAnswerComplete(result)}
                    />
                </View>
                <View style={styles.separator}/>
                <View style={styles.choicesContainer}>
                    {this.getChoicesOrFeedback()}
                </View>
            </View>
        )
    }

    getChoicesOrFeedback() {
        if (this.state.answerComplete) return this.getFeedback();
        return this.getChoices();
    }

    getFeedback() {
        return <Feedback
            expectedAnswer={this.getCurrentQuestion().answer}
            actualAnswer={this.state.answer}
            onEnd={() => this.onFeedbackEnd()}
            onChoiceFeedback={() => this.onChoiceFeedback()}/>;
    }


    getChoices() {
        let elements = [];
        let questionChoices = this.getCurrentQuestion().choices;
        if (this.state.choiceIndex >= questionChoices.length) {
            return elements;
        }

        if (this.state.playingFeedback) {
            return [
                // load feedback choice with word as last choice selected
                <Choice key={i}
                        text={this.state.answer[this.state.answer.length - 1]}
                        feedback={this.evaluation.feedback}
                        onPress={() => {}}/>
            ]
        }

        let currentChoices = questionChoices[this.state.choiceIndex];
        for (let i = 0; i < currentChoices.length; i++) {
            let text = currentChoices[i];
            console.log("creating choice with word " + text);
            elements.push(<Choice key={i}
                                  text={text}
                                  onPress={() => this.onChoice(text)}/>);
            // separator
            if (i < currentChoices.length - 1) {
                elements.push(<View style={styles.choiceSeparator}/>);
            }
        }

        return elements;
    }

    onAnswerPress() {
        if (this.state.answer.length != 0) this.undoLastChoice();
    }

    onAnswerComplete(result) {
        console.log("Game - onAnswerComplete");
        console.log(result);
        this.evaluateCurrentAnswer();
        this.setState({
            answerComplete: true,
            playingFeedback: true
        });

        // activate chain feedback animation and reset playingFeedback when done
    }

    onChoice(choice) {

        let newAnswer = this.state.answer.slice();
        newAnswer.push(choice);

        console.log("new answer: " + newAnswer.toString());

        this.setState({
            answer: newAnswer,
            choiceIndex: this.state.choiceIndex + 1
        })
    }

    undoLastChoice() {
        console.log("undoLastChoice");
        let newAnswer = this.state.answer.slice();
        let popped = newAnswer.pop();
        console.log("deleting last word in answer [" + popped + " ]");
        this.setState({
            answer: newAnswer,
            choiceIndex: this.state.choiceIndex - 1
        })
    }

    onFeedbackEnd() {
        console.log("Feedback end, no setting state.answerComplete to false");
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            choiceIndex: 0,
            answerComplete: false,
            answer: [],
            progress: (this.state.questionIndex + 1) / this.props.data.length
        })
    }

    onNewChoices() {
        console.log("Game - new choices");
    }

    renderNoMoreChoices() {
        console.log("Game - no more choices");
    }

    getCurrentQuestion() {
        return this.props.data[this.state.questionIndex];
    }

    onChoiceFeedback(data) {
        console.log("Game - onChoiceFeedback of [" + data.index + "]");
    }

    evaluateCurrentAnswer() {
        const textsOnCorrect = [
            "Correct Answer!",
            "Great Answer!",
            "Awesome Answer!",
            "Gorgeous Answer!",
            "Spectacular Answer",
        ];
        const textsOnIncorrect = [
            "Wrong!",
            "Ouch!",
            "Noooooo!",
            "OMG You Suck!",
            "Just Give Up Already...",
        ];

        const expectedAnswer = this.getCurrentQuestion().answer;
        const actualAnswer = this.state.answer;

        const minAnswerLength = expectedAnswer.length > actualAnswer.length ? actualAnswer.length : expectedAnswer.length;

        let results = [];
        for (let i = 0; i < minAnswerLength; i++) {
            results.push(expectedAnswer[i] === actualAnswer[i]);
        }
        let entries = [];
        let totalScore = 0;
        let combo = 1;
        let scorePerChoice = 0;
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let isLast = i === results.length - 1;
            scorePerChoice = result ? 100 * combo : 0;
            entries.push({
                combo: combo,
                score: scorePerChoice,
                result: result,
                text: !isLast ? "+" + scorePerChoice : (result ? textsOnCorrect[combo] : textsOnIncorrect[combo]),
                isLast: i === results.length - 1
            });
            combo = result ? combo + 1 : 1;
            totalScore += scorePerChoice;
        }

        this.evaluation = {
            feedback: entries,
            totalScore: totalScore
        };
    }
}

reactMixin(Game.prototype, TimerMixin);

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#E3E3E3",
    },
    separator: {
        height: 1,
        width: SCREEN_WIDTH - 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#B2B2B2"
    },
    choicesContainer: {
        height: (SCREEN_HEIGHT / 10) * 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceSeparator: {
        height: 5,
    }
};
