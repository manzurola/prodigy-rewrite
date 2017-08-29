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
            <View style={styles.choiceListContainer}>
                {this.getChoices()}
            </View>
        )
    }

    onChoice(word) {
        this.setState({
            index: this.index < this.props.answerKey.length ? this.index + 1 : this.index
        });
        if (word.isCorrect) this.onCorrectChoice(word.text);
        else this.onIncorrectChoice(word.text);
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
            for (let column = 0; column < this.props.answerKey.length; column++) {
                const wordText = this.props.choices[row][column];
                wordsPerChoiceButton.push({
                    text: wordText,
                    isCorrect: this.props.answerKey[column] === row
                });
            }
            choices.push(<Choice id={row}
                                 words={wordsPerChoiceButton}
                                 index={this.state.index}
                                 onPress={(data) => this.onChoice(data)}/>)
        }
        return choices;
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
            <TouchableHighlight style={styles.choiceContainer} onPress={(event) => this.onPress(event)}>
                <Text style={styles.choiceText}>{this.getWord().text}</Text>
            </TouchableHighlight>
        )
    }

    onPress(event) {
        console.log("onPress of [" + this.getWord().isCorrect + "] choice: [" + this.getWord().text + "]");
        this.props.onPress(this.getWord());
    }

    getWord() {
        return this.props.words[this.state.index];
    }
}

const styles = {
    choiceListContainer: {
        flex: 1,
    },
    choiceContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    choiceText: {
        fontSize: 24,
        color: "white",
        fontFamily: "josefin-sans-bold",
        textAlign: "center"
    }
};