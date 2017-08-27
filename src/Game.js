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
    TouchableWithoutFeedback
} from "react-native";

import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import ChoiceList from "./ChoiceList";
import Answer from "./Answer";
import Danger from "./Danger";
import Combo from "./Combo";
import Feedback from "./Feedback";

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
            <View style={styles.container}>
                <ProgressBar progress={this.state.progress}/>
                <Sentence text={this.getCurrentQuestion().sentence}/>
                <Answer this.words={this.state.answer} instructions={this.state.instructions}/>
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

const styles = {
    container: {
        backgroundColor: "#363636"
    }
};
