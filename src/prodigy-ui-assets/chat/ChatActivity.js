import React, {Component} from "react";
import {LayoutAnimation, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import Block from "../common/Block";
import UIText from "../common/UIText";
import MultiChoiceAnswerInput from "../common/MultiChoiceAnswerInput";

const CustomLayoutLinear = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
    // delete: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    // },
};

export default class ChatActivity extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Block>
                    <UIText style={styles.targetSentenceText}>{this.props.targetSentence}</UIText>
                </Block>
                <HorizontalSeparator/>
                <MultiChoiceAnswerInput
                    style={styles.answer}
                    choices={this.props.choices}
                    placeholderText={this.props.instructions}
                    onAnswerChange={(newAnswer) => this.onAnswerChange(newAnswer)}/>
            </View>
        )
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    block: {
        // width: 320,
    },
    targetSentenceText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    answer: {}
};
