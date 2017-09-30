import React, {Component} from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import TextButton from "./TextButton";

export default class MultiChoiceAnswerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
            index: 0,
            input: [],
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
            <View style={[this.props.style, styles.container]}>
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

    // show choices or delete last word in input
    onInputPress() {
        if (!this.state.isEmpty) {
            this.popWord();
        } else {
            !this.state.showChoices && this.showChoices();
        }
    }

    // append word to input
    onButtonPress(text) {
        console.log("Button pressed [" + text + "]");
        this.pushWord(text);
    }

    onTextChange() {
        this.props.onTextChange(this.getInputText());
    }

    pushWord(text) {
        let input = this.state.input.slice();
        input.push(text);
        this.setState({
            input: input
        }, this.onTextChange);
    }

    popWord() {
        let input = this.state.input.slice();
        input.pop();
        this.setState({
            input: input
        }, this.onTextChange);
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
        let {input} = this.state;
        let text = input[0];
        for (let i = 1; i < input.length; i++) {
            text += " " + input[i];
        }
        return <Text style={styles.inputText}>{text}</Text>
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#CFCDD7",
    },
    placeholderText: {},
    inputText: {},
    buttonContainer: {}
};