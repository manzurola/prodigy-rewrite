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

    componentWillReceiveProps(nextProps) {
        if (nextProps.words.length <= this.props.words.length) return;

        let newTexts = nextProps.words.filter((e, i) => {
            return i >= this.state.oldWords.words.length
        });
        let oldTexts = this.state.oldWords.concat(this.state.newWords);

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
        if (this.state.isEmpty) return <Text>{this.props.instructions}</Text>

        // show complete answer if

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
        borderWidth: 3,
        borderColor: "white",
    },
    newText: {
        color: "white"
    },
    oldText: {
        color: "white"
    },
    instructionText: {
        color: "white"
    }
};
