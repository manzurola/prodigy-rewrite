/**
 * Created by guym on 22/08/2017.
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
    TouchableWithoutFeedback
} from "react-native";

export default class ChoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    render() {
        return (
            <View>
                {this.getChoices()}
            </View>
        )
    }

    onChoice(data) {
        this.setState({
            index: this.index < this.props.answerKey.length ? this.index + 1 : this.index
        });
        if (data.isCorrect) this.onCorrectChoice(data.text);
        else this.onIncorrectChoice(data.text);
    }

    onCorrectChoice(word) {
        this.props.onCorrectChoice(word);
    }

    onIncorrectChoice(word) {
        this.props.onIncorrectChoice(word);
    }

    getChoices() {
        let choices = [];
        for (let row = 0; row < this.props.choices.length; row++) {
            let wordsPerChoiceButton = [];
            for (let column = 0; column < this.props.choices[row].length; column++) {
                const word = this.props.choices[row][column];
                wordsPerChoiceButton.push({
                    text: word,
                    isCorrect: this.props.answerKey[column] === word
                });
            }
            choices.push(<Choice words={wordsPerChoiceButton}
                                 index={this.state.index}
                                 onPress={(data) => this.onChoice(data)}/>)
        }
    }
}

// when a correct choice switches words, it flickers green
class Choice extends Component {
    constructor(props) {
        super(props); // props contain words: {text:, isCorrect:}...
        this.state = {
            index: 0
        }
    }

    render() {
        return (
            <TouchableHighlight onPress={(event) => this.onPress(event)}>
                <Text>{this.props.words.text}</Text>
            </TouchableHighlight>
        )
    }

    onPress(event) {
        console.log("onPress of choice " + this.props.words[this.state.index]);
        this.onPress(this.props[this.state.index]);
    }
}
