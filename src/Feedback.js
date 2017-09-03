/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import TimerMixin from "react-timer-mixin";
let reactMixin = require('react-mixin');

import Choice from "./Choice";

export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.widthAnim = new Animated.Value(230);
        this.textsOnCorrect = [
            "Correct Answer!",
            "Great Answer!",
            "Awesome Answer!",
            "Gorgeous Answer!",
            "Spectacular Answer",
        ];
        this.textsOnIncorrect = [
            "Wrong!",
            "Ouch!",
            "Noooooo!",
            "OMG You Suck!",
            "Just Give Up Already...",
        ];
        let results = this.check(props.expectedAnswer, props.actualAnswer);
        let entries = [];
        let totalScore = 0;
        let combo = 1;
        let scorePerChoice = 0;
        let elements = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let isLast = i === results.length - 1;
            scorePerChoice = result ? 100 * combo : 0;
            entries.push({
                combo: combo,
                score: scorePerChoice,
                result: result,
                text: !isLast ? "+" + scorePerChoice : (result ? this.textsOnCorrect[combo] : this.textsOnIncorrect[combo]),
                isLast: i === results.length - 1
            });
            combo = result ? combo + 1 : 1;
            totalScore += scorePerChoice;

            elements.push(this.getElement(entries[i]));
        }
        this.elements = elements;
        this.score = totalScore;
    }

    render() {
        return (
            <View>
                {this.elements[this.state.index]}
            </View>
        )
    }

    componentDidMount() {
        console.log("Feedback - componentDidMount");
        console.log(this.elements);
        for (let i = 0; i < this.elements.length; i++) {
            this.setTimeout(() => {
                const isLast = i === this.elements.length - 1;
                if (!isLast) {
                    this.setState({
                        index: this.state.index + 1
                    });
                } else this.onEnd();
            }, 500 * i);
        }
    }

    getElement(entry) {
        return [
            <FeedbackCombo style={styles.combo} count={entry.combo}/>,
            <Choice style={styles.icon} text="" type={entry.result}/>,
            <FeedbackText style={styles.text} text={entry.text}/>
        ];
    }

    // getElement(entry) {
    //     return [
    //         <FeedbackCombo style={styles.combo} count={entry.combo}/>,
    //         <FeedbackIcon style={styles.icon} type={entry.result}/>,
    //         <FeedbackScore style={styles.score} score={entry.score}/>
    //     ];
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log("Feedback nextProps " + nextProps);
    //     if (this.props.id === nextProps.id) return;
    //     Animated.timing(
    //         this.state.widthAnim,
    //         {
    //             toValue: 50,
    //             duration: 500,
    //             easing: Easing.linear,
    //         }
    //     ).start();
    // }

    onEnd() {
        console.log("Feedback ended");
        this.setTimeout(() => {
            this.props.onEnd();
        }, 500);
    }

    onChoiceWasEvaluated() {
        console.log("Choice was evaluated");
        this.props.onChoiceWasEvaluated({
            index: this.state.index
        });
    }

    check(expected, actual) {
        let results = [];
        for (let i = 0; i < expected.length; i++) {
            results.push(expected === actual);
        }
        return results;
    }
}
reactMixin(Feedback.prototype, TimerMixin);

class FeedbackIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        // this.widthAnim = new Animated.Value(230);
    }

    render() {
        return (
            <Animated.View style={[styles.icon, {width: this.widthAnim}]}/>
        )
    }

    // componentDidMount() {
    //     Animated.timing(
    //         this.widthAnim,
    //         {
    //             toValue: 50,
    //             duration: 500,
    //             // easing: Easing.linear,
    //         }
    //     ).start();
    // }
}

class FeedbackText extends Component {
    render() {
        return (
            <Animated.View>
                <Text>{this.props.text}</Text>
            </Animated.View>
        )
    }
}

class FeedbackCombo extends Component {
    render() {
        return (
            <Animated.View>
                <Text>{this.props.combo}</Text>
            </Animated.View>
        )
    }
}

class FeedbackScore extends Component {

}

const styles = {
    icon: {
        width: 230,
        height: 50,
        borderRadius: 50 / 2,
        justifyContent: 'center',
        backgroundColor: '#434343',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    text: {
        fontSize: 24,
        color: "#E3E3E3",
        paddingLeft: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-bold",
        textAlign: "left"
    },
};
