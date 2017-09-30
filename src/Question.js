/**
 * Created by guym on 05/06/2017.
 */
import STYLES from "./Styles.js";
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
    TouchableWithoutFeedback
} from "react-native";

export default class Question extends Component {

    constructor(props) {
        super(props);

        console.log("calling question constructor");

        this.state = {
            isAnswerComplete: false,
            answer: [],
            answerIndex: 0
        };
    }

    getAnswer() {
        return this.state.answer;
    }

    isCorrect() {
        return
    }

    render() {
        return (
            <View style={STYLES.questionContainer}>
                <View style={STYLES.bodyContainer}>
                    <Text style={STYLES.bodyText}>{this.props.body}</Text>
                </View>
                <View style={STYLES.answerContainer}>
                    <Answer onPress={() => this.deleteLastWordInAnswer()}
                            words={this.state.answer}
                            instructions={this.props.instructions}
                            answerKey={this.props.answer}
                            showResult={this.state.isAnswerComplete}/>
                </View>
                <View style={STYLES.choicesContainer}>
                    <Choice style={STYLES.choice} text={this.props.choices[this.state.answerIndex][0]}
                            onPress={() => this.onChoice(0)}/>
                    <Choice style={STYLES.choice} text={this.props.choices[this.state.answerIndex][1]}
                            onPress={() => this.onChoice(1)}/>
                    <Choice style={STYLES.choice} text={this.props.choices[this.state.answerIndex][2]}
                            onPress={() => this.onChoice(2)}/>
                </View>
            </View>
        );
    }

    deleteLastWordInAnswer() {
        console.log("delete last word in answer");
        if (this.state.answer.length === 0 || this.state.isAnswerComplete) return;
        this.setState((previousState) => {
            previousState.answer.pop();
            return {
                answer: previousState.answer,
                answerIndex: previousState.answerIndex - 1
            }
        });
    }

    onChoice(selectedChoiceIndex) {

        // if question is complete then do nothing

        if (this.state.isAnswerComplete) return;

        console.log("adding choice to answer");

        // add the choice to the answer and evaluate if question is complete

        const selectedChoice = this.props.choices[this.state.answerIndex][selectedChoiceIndex];

        let answerComplete = false;

        this.setState((previousState) => {

            previousState.answer.push(selectedChoice);

            // if current choice was last, question is complete

            answerComplete = this.props.answer.length === this.state.answer.length;

            console.log("isAnswerComplete: " + answerComplete);

            return {
                answer: previousState.answer,
                answerIndex: answerComplete ? previousState.answerIndex : previousState.answerIndex + 1,
                isAnswerComplete: answerComplete
            }
        });

        if (answerComplete) this.completed();
    }

    completed() {
        this.props.completed(this);
    }
}

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            isCorrect: false,
            input: []
        }
    }

    render() {
        let view = [];
        // show instructions if answer is empty
        if (this.props.words.length === 0) {
            console.log("setting instructions");
            view.push(<Text key='0' style={STYLES.instructionsText}>{this.props.instructions}</Text>);
        } else {
            for (let i = 0; i < this.props.words.length; i++) {
                let text;
                const word = this.props.words[i];
                const correct = word === this.props.answerKey[i];
                if (this.props.showResult) {
                    if (correct) {
                        text = <Text style={[STYLES.answerWordText, {color:'green'}]} key={i}>{word}</Text>;
                    } else {
                        text = <Text style={[STYLES.answerWordText, {color:'red'}]} key={i}>{word}</Text>;
                    }
                } else {
                    text = <Text style={STYLES.answerWordText} key={i}>{word}</Text>;
                }
                view.push(text);
            }
        }
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={STYLES.answer}>
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent:'space-between',
                }}>{view}</View>
            </TouchableHighlight>
        )
    }
}

class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }
    }

    render() {
        return (
            <TouchableHighlight activeOpacity={1}
                                style={this.state.pressed ? STYLES.choicePressed : STYLES.choice}
                                onPress={this.props.onPress}
                                onHideUnderlay={()=>{this.setState({pressed: false})}}
                                onShowUnderlay={()=>{this.setState({pressed: true})}}
            >
                <Text style={this.state.pressed ? STYLES.textPressed: STYLES.chars}>{this.props.chars}</Text>
            </TouchableHighlight>
        )
    }
}