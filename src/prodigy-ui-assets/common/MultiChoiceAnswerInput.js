import React, {Component} from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import TextButton from "./TextButton";
import TimerMixin from "react-timer-mixin";
import UIText from "./UIText";

let reactMixin = require('react-mixin');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
        console.log(choices);
        this.choices = choices;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity style={styles.input}
                                  onPress={() => {
                                      this.onInputPress();
                                  }}>
                    {this.state.isEmpty ? this.getPlaceholderText() : this.getInputText()}
                </TouchableOpacity>
                {
                    !this.state.showChoices ? null :
                        <View style={[styles.choiceContainer]}>
                            {[this.getTextButton(0), this.getTextButton(1), this.getTextButton(2)]}
                        </View>
                }
            </View>
        )
    }

    // show choices or delete last word in answer
    onInputPress() {
        if (!this.state.isEmpty) {
            this.popWord();
        } else {
            !this.state.showChoices && this.showChoices();
            this.onAnswerChange();
        }
    }

    // append word to answer
    onButtonPress(text) {
        this.pushWord(text);
    }

    onAnswerChange() {
        this.props.onAnswerChange(this.getInputText());
    }

    pushWord(text) {
        let input = this.state.answer.slice();
        input.push(text);
        this.setAnswer(input);
    }

    popWord() {
        let input = this.state.answer.slice();
        input.pop();
        this.setAnswer(input);
    }

    setAnswer(input) {
        let newIndex = input.length;
        let lastIndex = this.choices.length - 1;
        this.setState({
            isEmpty: input.length === 0,
            answer: input,
            index: newIndex <= lastIndex ? newIndex : lastIndex
        }, this.onAnswerChange);
    }

    showChoices() {
        console.log("showing choices");
        this.setState({
            showChoices: true
        }, () => {
        });
    }

    hideChoices() {
        this.setState({
            showChoices: false
        })
    }

    getTextButton(i) {
        let text = this.choices[i][this.state.index];
        return <TextButton
            style={styles.button}
            text={text}
            onPress={() => this.onButtonPress(text)}
        />;
        // return <Appear timeout={(i+1)  * 150}>
        //     <TextButton
        //         text={text}
        //         onPress={() => this.onButtonPress(text)}
        //     />
        // </Appear>
    }

    getPlaceholderText() {
        return <UIText style={styles.placeholderText}>{this.props.placeholderText}</UIText>
    }

    getInputText() {
        let {answer} = this.state;
        let text = answer[0];
        for (let i = 1; i < answer.length; i++) {
            text += " " + answer[i];
        }
        return <UIText style={styles.inputText}>{text}</UIText>
    }
}
reactMixin(MultiChoiceAnswerInput.prototype, TimerMixin);

const styles = {
    container: {
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    input: {
        width: SCREEN_WIDTH,
        minHeight: 70,
        paddingLeft: 30,
        alignItems: 'start',
        justifyContent: 'center',
    },
    placeholderText: {
        // flex: 1,
    },
    inputText: {},
    choiceContainer: {
        width: SCREEN_WIDTH,
        height: 200,
        flexDirection: 'row'
    },
    button: {
        width: SCREEN_WIDTH / 3,
        borderRadius: 0,
    }
};