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
import ProgressBar from "./ProgressBar";
import Sentence from "./Sentence";
import Answer from "./Answer";
import ChoiceList from "./ChoiceList";
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
            answer: [],
            score: 0,
            progress: 0,
            combo: 0,
            isInDanger: false,
            choiceIndex: 0,
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
                    flex: 1.5,
                }}>
                    <ProgressBar progress={this.state.progress}/>
                </View>
                <View style={{
                    flex: 7,
                    flexDirection: 'column',
                    padding: 10,
                    justifyContent: 'flex-end',
                    alignItems: 'stretch'
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
                <View style={{
                    flex: 5,

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
                index={this.state.choiceIndex}
                answerKey={this.getCurrentQuestion().answerKey}
                onNewChoices={() => {
                    this.onNewChoices();
                }}
                onNoMoreChoices={ () => {
                    this.onNoMoreChoices();
                }}
                onChoice={(choice) => {
                    this.onChoice(choice);
                }}
            />
        )
    }

    onAnswerPress() {
        if (this.state.answer.length != 0) this.undoLastChoice();
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

    onNoMoreChoices() {
        console.log("Game - no more choices");
    }

    getCurrentQuestion() {
        return this.props.data[this.state.questionIndex];
    }

    onAnswerComplete(result) {
        console.log("Game - onAnswerComplete");
        console.log(result);
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#E3E3E3",
    }
};
