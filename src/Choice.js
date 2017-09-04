/**
 * Created by guym on 22/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, Text, TouchableHighlight} from "react-native";
import TimerMixin from "react-timer-mixin";
let reactMixin = require('react-mixin');

export default class Choice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            feedbackIndex: 0,
        };
        this.widthAnim = new Animated.Value(230);
    }


    render() {
        return (
            <View style={styles.container}>
                {this.getFeedbackCombo()}
                <Animated.View
                    style={[
                        styles.touchableContainer,
                        this.state.pressed && styles.choiceContainerPressed,
                        this.props.style,
                        {width: this.widthAnim}
                    ]}>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={(event) => this.onPress(event)}
                        onHideUnderlay={() => {
                            this.setState({pressed: false})
                        }}
                        onShowUnderlay={() => {
                            this.setState({pressed: true})
                        }}>
                        <Text
                            style={[
                                styles.choiceText,
                                this.state.pressed && styles.choiceTextPressed,
                                this.props.textStyle
                            ]}>
                            {this.props.text}
                        </Text>
                    </TouchableHighlight>
                </Animated.View>
                {this.getFeedbackText()}
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log("Choice: componentWillReceiveProps, playFeedback " + nextProps.playFeedback);
        if (nextProps.playFeedback === this.props.playFeedback) return;
        if (nextProps.playFeedback) {
            this.loadFeedback();
        } else {
            this.resetFeedback();
        }
    }

    getFeedbackCombo() {
        if (!this.props.playFeedback) return null;
        return <Text>{this.getFeedbackEntry().combo}</Text>
    }

    getFeedbackText() {
        if (!this.props.playFeedback) return null;
        return <Text>{this.getFeedbackEntry().text}</Text>
    }

    onPress() {
        this.props.onPress({text: this.props.text, id: this.props.id});
    }

    hasFeedback() {
        return !!this.props.feedback;
    }

    loadFeedback() {
        console.log("Choice: loading feedback");
        //animate shrink choice
        this.widthAnim = new Animated.Value(230);
        Animated.timing(
            this.widthAnim,
            {
                toValue: 50,
                duration: 300,
                // easing: Easing.linear,
            }
        ).start(() => {
            for (let i = 0; i < this.props.feedback.length; i++) {
                this.setTimeout(() => {
                    const isLast = i === this.props.feedback.length - 1;
                    if (!isLast) {
                        this.setState({
                            feedbackIndex: this.state.feedbackIndex + 1
                        });
                    } else {
                        this.setTimeout(() => {
                            this.feedbackDidEnd()
                        }, 500);
                    }
                }, 500 * i);
            }
        });
    }

    resetFeedback() {
        this.widthAnim = new Animated.Value(50);
        Animated.timing(
            this.widthAnim,
            {
                toValue: 230,
                duration: 300,
                // easing: Easing.linear,
            }
        ).start(this.setState({
            feedbackIndex: 0
        }));
    }

    feedbackDidEnd() {
        console.log("Choice: feedbackDidEnd");
        this.props.onFeedbackEnd();
    }

    getFeedbackEntry() {
        if (!this.hasFeedback()) return null;
        return this.props.feedback[this.state.feedbackIndex];
    }
}
reactMixin(Choice.prototype, TimerMixin);

const styles = {
    container: {
        width: 230,
        height: 50,
        justifyContent: 'left',
        flexDirection: 'row',
    },
    touchableContainer: {
        width: 230,
        height: 50,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 50 / 2,
        backgroundColor: '#434343',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    choiceContainerPressed: {},
    choiceText: {
        fontSize: 24,
        color: "#E3E3E3",
        paddingLeft: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-bold",
        textAlign: "left"
    },
    choiceTextPressed: {},
    choiceSeparator: {
        height: 5,
    },
    feedbackCombo: {},
    feedbackText: {}
};