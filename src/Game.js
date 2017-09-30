/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {
    View,
    Dimensions,
    LayoutAnimation,
    UIManager
} from "react-native";
import TimerMixin from "react-timer-mixin";
import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import Answer from "./Answer";
import Choice from "./Choice";
import AnswerCompleteFeedback from "./AnswerCompleteFeedback";
let reactMixin = require('react-mixin');
import { LinearGradient } from 'expo';

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

const CustomLayoutLinear = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5,
    },
    // delete: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    // },
};

const springAnimationProperties = {
    type: 'spring',
    springDamping: 0.4,
    property: 'opacity',
};

const animationConfig = {
    duration: 300,
    create: springAnimationProperties,
    update: springAnimationProperties,
    delete: springAnimationProperties,
};

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            choiceIndex: 0,
            selectedChoiceId: 0,
            answer: [],
            progress: 0,
            score: 0,
            combo: 0,
            playingFeedback: false,
            showChoices: false,
        };
        this.evaluation = {};
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    render() {
        return (
            <View style={[styles.container, {
                bottom: this.state.showChoices ? (SCREEN_HEIGHT / 10) * 2 : 0
            }]}>
                <View style={{
                    height: SCREEN_HEIGHT / 10,
                }}>
                    <ProgressBar progress={this.state.progress} barWidth={SCREEN_WIDTH * 4 / 5}/>
                </View>
                <View style={{
                    height: (SCREEN_HEIGHT / 10) * 5,
                }}>
                    {/*<LinearGradient*/}
                        {/*colors={['rgba(0,0,0,0.8)', 'transparent']}*/}
                        {/*style={{*/}
                            {/*flex: 1*/}
                        {/*}}*/}
                    {/*>*/}
                    <Sentence text={this.getCurrentQuestion().sentence}/>
                    {/*</LinearGradient>*/}
                </View>
                <View style={{
                    height: (SCREEN_HEIGHT / 10) * 4,
                }}>
                    <Answer answer={this.getCurrentQuestion().answer}
                            input={this.state.answer}
                            instructions={this.getCurrentQuestion().instructions}
                            onPress={() => this.onAnswerPress()}
                            onComplete={(result) => this.onAnswerComplete(result)}
                    />
                </View>
                <View style={{
                    height: (SCREEN_HEIGHT / 10) * 3,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {this.state.showChoices ? this.getChoices() : null}
                </View>
            </View>
        )
    }

    getAnswerCompleteFeedback() {
        return (
            <AnswerCompleteFeedback style={{
                width: SCREEN_WIDTH
            }}/>
        )
    }

    getChoices() {
        let elements = [];
        let questionChoices = this.getCurrentQuestion().choices;
        if (this.state.choiceIndex >= questionChoices.length) {
            return elements;
        }
        let currentChoices = questionChoices[this.state.choiceIndex];
        for (let i = 0; i < currentChoices.length; i++) {
            let text = currentChoices[i];
            elements.push(<Choice key={i}
                                  id={i}
                                  text={text}
                                  playFeedback={this.state.selectedChoiceId === i && this.state.playingFeedback}
                                  feedback={this.evaluation.feedback}
                                  onFeedbackEnd={() => this.onFeedbackEnd()}
                                  disablePress={this.state.playingFeedback}
                                  onPress={(data) => this.onChoice(data)}/>);
            // separator
            if (i < currentChoices.length - 1) {
                elements.push(<View style={styles.choiceSeparator}/>);
            }
        }
        return elements;
    }

    onAnswerComplete(result) {
        console.log("Game - onAnswerComplete");
        this.evaluateCurrentAnswer();
        this.setState({
            playingFeedback: true,
            answerComplete: true,
        });

        // activate chain feedback animation and reset playingFeedback when done
        this.timeoutClearId = this.setTimeout(() => {
            this.progress();
        }, 1000);
    }

    progress() {
        console.log("progressing to next question or level completed");
        this.clearTimeout(this.timeoutClearId); // clear timeout if this func is triggered by a press
        this.setState({
            questionIndex: this.getNextQuestion(),
            choiceIndex: 0,
            answer: [],
            progress: (this.state.questionIndex + 1) / this.props.data.length,
            playingFeedback: false,
            answerComplete: false,
        });
    }

    getNextQuestion() {
        let total = this.props.data.length;
        let current = this.state.questionIndex;
        let next = current + 1;
        return next < total ? next : 0;
    }

    onChoice(data) {

        let newAnswer = this.state.answer.slice();
        newAnswer.push(data.chars);

        console.log("new answer: " + newAnswer.toString());

        let totalChoices = this.getCurrentQuestion().choices.length;
        let currentChoice = this.state.choiceIndex;
        let nextChoice = currentChoice + 1;

        this.setState({
            answer: newAnswer,
            selectedChoiceId: data.id,
            choiceIndex: nextChoice < totalChoices ? nextChoice : currentChoice
        })
    }

    onAnswerPress() {
        if (this.state.answer.length === 0) {
            this.setState({
                showChoices: true,
            });
            return;
        }
        let newAnswer = this.state.answer.slice();
        let popped = newAnswer.pop();
        console.log("deleting last word in answer [" + popped + " ]");
        this.setState({
            answer: newAnswer,
            choiceIndex: this.state.choiceIndex - 1
        })
    }

    onFeedbackEnd() {
        console.log("Feedback end, now setting state.playingFeedback to false");
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            choiceIndex: 0,
            answer: [],
            progress: (this.state.questionIndex + 1) / this.props.data.length,
            playingFeedback: false
        });
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

        console.log("evaluated answer");
    }
}

reactMixin(Game.prototype, TimerMixin);

const styles = {
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    separator: {
        height: 1,
        width: SCREEN_WIDTH - 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#B2B2B2"
    },
    choicesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceSeparator: {
        height: 10,
    }
};
