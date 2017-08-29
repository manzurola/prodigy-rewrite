/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";

export default class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldWords: [],
            newWords: [],
            isEmpty: true,
            isComplete: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.words.length <= this.props.words.length) return;

        let newTexts = props.words.filter((e, i) => {
            return i >= this.state.oldWords.length
        });
        let oldTexts = this.state.oldWords.concat(this.state.newWords);

        console.log("Answer - newTexts - " + newTexts.toString());
        console.log("Answer - oldTexts - " + oldTexts.toString());

        this.setState({
            oldWords: oldTexts,
            newWords: newTexts,
            isEmpty: false
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getBody()}
            </View>
        )
    }

    onComplete() {
        console.log("Answer - onComplete");
        this.props.onComplete();
    }

    getBody() {
        //show instructions if no words entered
        if (this.state.isEmpty) return <Text style={styles.instructionText}>{this.props.instructions}</Text>;

        let oldTexts = [];
        let newTexts = [];

        for (this.words in this.state.oldWords) {
            oldTexts.push(<Text style={styles.oldText}/>);
        }
        for (this.words in this.state.newWords) {
            newTexts.push(<Text style={styles.newText}/>);
        }

        return (
            <View style={styles.container}>
                {oldTexts.concat(newTexts)}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
