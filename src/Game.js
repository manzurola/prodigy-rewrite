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
    Dimensions
} from "react-native";
import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import Answer from "./Answer";
import Feedback from "./Feedback";
import ChoiceList from "./ChoiceList";
import Danger from "./Danger";
import Combo from "./Combo";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            answer: [],
            score: 0,
            progress: 0,
            combo: 0,
            isInDanger: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1.5,
                }}>
                    <ProgressBar progress={this.state.progress}/>
                </View>
                <View style={{
                    flex: 5,
                    padding: 10,
                }}>
                    <Sentence text={this.getCurrentQuestion().sentence}/>
                </View>
                <View style={{
                    flex: 5,
                    padding: 10,
                }}>
                    <Answer words={this.state.answer} instructions={this.getCurrentQuestion().instructions}/>
                </View>
                <View style={{
                    flex: 2,
                    padding: 10,
                }}>
                    {this.getFeedback()}
                </View>
                <View style={{
                    flex: 7,
                    padding: 10,
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
        console.log("Game - correct choice " + choice);

        let outOfDanger = false;
        let combo = 0;
        if (this.state.isInDanger) {
            outOfDanger = true;
            combo = 0;
        } else {
            combo++;
        }

        let newAnswer = this.state.answer.slice();
        newAnswer.push(choice);

        this.setState({
            combo: combo,
            isInDanger: !outOfDanger,
            answer: newAnswer
        });

        if (outOfDanger) this.onSafe();
    }

    onIncorrectChoice(choice) {
        console.log("Game - incorrect choice " + choice);
        let newCombo = 0;
        let comboLost = false;
        let isInDanger = false;
        if (this.state.combo > 0) {
            newCombo = this.state.combo - 1;
            comboLost = true;
        } else {
            isInDanger = false;
        }
        this.setState({
            isInDanger: !comboLost,
            combo: newCombo,
        });
        if (comboLost) this.onComboLost();
        if (isInDanger) this.onDanger();
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

    onDanger() {
        console.log("Game - danger");
    }

    onSafe() {
        console.log("Game - safe (out of danger)");
    }

    gameOver() {

    }

    getCurrentQuestion() {
        return this.props.data[this.state.questionIndex];
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#363636",
    }
};
