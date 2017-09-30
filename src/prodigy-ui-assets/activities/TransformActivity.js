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
                        placeholderText={this.props.instructions}/>
                </Block>
            </View>
        )
    }
}

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: props.text || false
        }
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {this.state.isEmpty ? <Text>{this.props.placeholderText}</Text> : <Text>{this.props.text}</Text>}
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
        height: 200,
        width: 320,
    },
    targetSentenceText: {},
    answer: {}
};
