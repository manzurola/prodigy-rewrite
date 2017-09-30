import React, {Component} from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import TextButton from "./TextButton";

export default class MultiChoiceAnswerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
            index: 0,
            answer: [],
            showChoices: props.showChoices || false
        };

        let choices = [
            [],
            [],
            []
        ];

        for (let i = 0; i < props.choices.length; i++) {
            let longChoice = props.choices[i];
            let words = longChoice.split(" ").map(function (item) {
                return item.trim();
            });
            for (let j = 0; j < words.length; j++) {
                let word = words[j];
                choices[i].push(word);
            }
        }

        this.choices = choices;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback onPress={() => {
                    this.onInputPress();
                }}>
                    {this.state.isEmpty ? this.getPlaceholderText() : this.getInputText()}
                </TouchableWithoutFeedback>
                <View style={styles.buttonContainer}>
                    {this.state.showChoices && [this.getTextButton(0), this.getTextButton(1), this.getTextButton(2)]}
                </View>
            </View>
        )
    }

    // show choices or delete last word in answer
    onInputPress() {
        if (!this.state.isEmpty) {
            this.popWord();
        } else {
            !this.state.showChoices && this.showChoices();
        }
    }

    // append word to answer
    onButtonPress(text) {
        console.log("Button pressed [" + text + "]");
        this.pushWord(text);
    }

    onAnswerChange() {
        let newIndex = this.state.answer.length;
        let lastIndex = this.choices.length - 1;

        this.setState({
            index:  newIndex <= lastIndex ? newIndex : lastIndex
        }, () => this.props.onAnswerChange(this.getInputText()));
    }

    pushWord(text) {
        let input = this.state.answer.slice();
        input.push(text);
        this.setState({
            isEmpty: false,
            answer: input
        }, this.onAnswerChange);
    }

    popWord() {
        let input = this.state.answer.slice();
        input.pop();
        this.setState({
            isEmpty: input.length === 0,
            answer: input
        }, this.onAnswerChange);
    }

    showChoices() {
        this.setState({
            showChoices: true
        })
    }

    hideChoices() {
        this.setState({
            showChoices: false
        })
    }

    getTextButton(i) {
        let text = this.choices[i][this.state.index];
        return <TextButton
            text={text}
            onPress={() => this.onButtonPress(text)}
        />
    }

    getPlaceholderText() {
        return <Text style={styles.placeholderText}>{this.props.placeholderText}</Text>
    }

    getInputText() {
        let {answer} = this.state;
        let text = answer[0];
        for (let i = 1; i < answer.length; i++) {
            text += " " + answer[i];
        }
        return <Text style={styles.inputText}>{text}</Text>
    }
}

const styles = {
    container: {
        backgroundColor: "transparent",
        padding: 20,
    },
    placeholderText: {},
    inputText: {},
    buttonContainer: {}
};