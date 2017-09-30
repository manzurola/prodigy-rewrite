import React, {Component} from "react";
import {Text, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import Block from "../common/Block";
import UIText from "../common/UIText";
import MultiChoiceAnswerInput from "../common/MultiChoiceAnswerInput";

export default class TransformActivity extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Block style={styles.block}>
                    <UIText style={styles.targetSentenceText}>{this.props.targetSentence}</UIText>
                    <HorizontalSeparator/>
                    <MultiChoiceAnswerInput
                        style={styles.answer}
                        choices={this.props.choices}
                        placeholderText={this.props.instructions}
                        onAnswerChange={(newAnswer)=> this.onAnswerChange(newAnswer)}/>
                </Block>
            </View>
        )
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
    }
}

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: props.chars || false
        }
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {this.state.isEmpty ? <Text>{this.props.placeholderText}</Text> : <Text>{this.props.chars}</Text>}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        width: 320,
    },
    targetSentenceText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    answer: {}
};
