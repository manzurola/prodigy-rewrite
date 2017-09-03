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
var reactMixin = require('react-mixin');

import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import Answer from "./Answer";
import Choice from "./Choice";
import Danger from "./Danger";
import Combo from "./Combo";

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
            choiceIndex: 0,
            answer: [],
            progress: 0,
            score: 0,
            combo: 0,
        }
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
                    <ProgressBar progress={this.state.progress} barWidth={SCREEN_WIDTH *  4/5}/>
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
                <View style={{
                    flex: 0,
                }}>
                    {this.getFeedback()}
                </View>
                <View style={styles.separator}/>
                <View style={{
                    height: (SCREEN_HEIGHT / 10) * 3,
                }}>
                    {this.getChoices()}
                </View>
            </View>
        )
    }

    getFeedback() {
        if (this.state.isInDanger) return <Danger/>;
        else if (this.state.combo > 1) return <Combo count={this.state.combo}/>;
    }

    // getChoices() {
    //     return (
    //         <ChoiceList
    //             choices={this.getCurrentQuestion().choices}
    //             index={this.state.choiceIndex}
    //             answerKey={this.getCurrentQuestion().answerKey}
    //             onNewChoices={() => {
    //                 this.onNewChoices();
    //             }}
    //             renderNoMoreChoices={ () => {
    //                 this.renderNoMoreChoices();
    //             }}
    //             onChoice={(choice) => {
    //                 this.onChoice(choice);
    //             }}
    //         />
    //     )
    // }

    getChoices() {
        let elements = [];
        let questionChoices = this.getCurrentQuestion().choices;
        if (this.state.choiceIndex >= questionChoices.length) return elements;
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

        return <View style={styles.choiceListContainer}>{elements}</View>;
    }

    onAnswerPress() {
        if (this.state.answer.length != 0) this.undoLastChoice();
    }

    onAnswerComplete(result) {
        console.log("Game - onAnswerComplete");
        console.log(result);
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            choiceIndex: 0,
            answer: [],
            progress: (this.state.questionIndex + 1) / this.props.data.length
        })
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

    onNewChoices() {
        console.log("Game - new choices");
    }

    renderNoMoreChoices() {
        console.log("Game - no more choices");
    }

    getCurrentQuestion() {
        return this.props.data[this.state.questionIndex];
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
    choiceListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceSeparator: {
        height: 5,
    }
};
