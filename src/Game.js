/**
 * Created by guym on 20/08/2017.
 */
import ProgressBar from "./ProgressBar";
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

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            answer: [],
            score: 0,
            progress: 0,
            combo: 0,
            isInDanger: false,
        }
    }

    render() {
        return (
            <View>
                <ProgressBar progress={this.state.progress}/>
                <Sentence text={this.getCurrentQuestion().sentence}/>
                <Answer choices={this.state.answer}/>
                {this.getFeedback()}
                {this.getChoices()}
            </View>
        )
    }

    getFeedback() {
        if (this.state.isInDanger) return <Danger/>;
        else if (this.state.combo > 1) return <Combo count={this.state.combo}/>;
    }

    getChoices() {
        return (
            <ChoiceList
                choices={this.getCurrentQuestion().choices}
                answerKey={this.getCurrentQuestion().answerKey}
                onNewChoice={() => {
                    this.onNewChoices();
                }}
                onNoMoreChoices={ () => {
                    this.onNoMoreChoices();
                }}
                onCorrectChoice={(choice) => {
                    this.onCorrectChoice(choice);
                }}
                onIncorrectChoice={(choice) => {
                    this.onIncorrectChoice(choice);
                }}
            />
        )
    }

    onCorrectChoice(choice) {
        console.log("Game - correct choice" + choice);
        this.setState({
            combo: this.state.combo + 1
        });
    }

    onIncorrectChoice(choice) {
        console.log("Game - incorrect choice" + choice);
        let newCombo = 0;
        let comboLost = false;
        if (this.state.combo > 0) {
            newCombo = this.state.combo - 1;
            comboLost = true;
        }
        this.setState({
            isInDanger: !comboLost,
            combo: newCombo,
        });
        if (comboLost) this.onComboLost();
    }

    onNewChoices() {
        console.log("Game - new choices");
    }

    onNoMoreChoices() {
        console.log("Game - no more choices");
    }

    onComboLost() {
        console.log("Game - combo lost");
    }

    gameOver() {

    }

    getCurrentQuestion() {
        return this.props.questions[this.state.questionIndex];
    }
}
