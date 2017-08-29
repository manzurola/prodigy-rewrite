/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Text,
    TouchableHighlight
} from "react-native";

export default class Answer extends Component {

    render() {
        return (
            <TouchableHighlight style={styles.container}>
                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'space-between',
                }}>
                    {this.getBody()}
                </View>
            </TouchableHighlight>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log("Answer - nextProps");
        console.log(nextProps);

        if (this.isComplete(this.props.answer, nextProps.input)) {
            this.onComplete();
        }
    }

    isComplete(answer, input) {
        return answer.length === input.length;
    }

    onComplete() {
        console.log("Answer - onComplete");
        let result = {
            input: {},
            answer: this.props.answer
        };
        for (let i = 0; i < this.props.answer.length; i++) {
            let expected = this.props.answer[i];
            let actual = this.props.input[i];
            result.input[actual] = expected === actual;
        }
        this.props.onComplete(result);
    }


    getBody() {
        //show instructions if no words entered
        const isEmpty = this.props.input.length === 0;
        if (isEmpty) return <Text style={styles.instructionText}>{this.props.instructions}</Text>;

        let words = [];
        for (let i = 0; i < this.props.input.length; i++) {
            words.push(<Text key={i} style={styles.text}>{this.props.input[i]}</Text>)
        }

        return words;
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
    },
    text: {
        fontSize: 30,
        color: "white",
        fontFamily: "josefin-sans-bold",
        textAlign: "center",
        // fontWeight: "bold",
        padding: 2,
    },
    newText: {
        fontSize: 30,
        color: "white",
        fontFamily: "josefin-sans-bold",
        textAlign: "center",
        fontWeight: "bold",
    },
    oldText: {
        fontSize: 30,
        color: "white",
        fontFamily: "josefin-sans-light",
        textAlign: "center"
    },
    instructionText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: "white",
        fontFamily: "josefin-sans-light-italic",
        textAlign: "center"
    }
};
