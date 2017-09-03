/**
 * Created by guym on 22/08/2017.
 */
import React, {Component} from "react";
import {Animated, Text, TouchableHighlight} from "react-native";
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
        if (nextProps.playFeedback = this.props.playFeedback) return;

    }

    getFeedbackCombo() {
        if (!this.state.playingFeedback) return null;
        return <Text>{this.getFeedbackEntry().combo}</Text>
    }

    getFeedbackText() {
        if (!this.state.playingFeedback) return null;
        return <Text>{this.getFeedbackEntry().text}</Text>
    }

    onPress() {
        console.log("onPress of choice: [" + this.props.text + "]");
        if (this.state.playingFeedback) return;
        let playingFeedback = false;
        if (this.hasFeedback()) {
            this.widthAnim = new Animated.Value(230);
            this.setState({
                playingFeedback: true
            }, this.loadFeedback);
            playingFeedback = true;
        }
        this.props.onPress({
            text: this.props.text,
            playingFeedback: playingFeedback,
        });
    }

    hasFeedback() {
        return !!this.props.feedback;
    }

    loadFeedback() {
        //animate shrink choice
        Animated.timing(
            this.widthAnim,
            {
                toValue: 50,
                duration: 500,
                // easing: Easing.linear,
            }
        ).start(() => {
            for (let i = 0; i < this.props.feedback.length; i++) {
                this.setTimeout(() => {
                    const isLast = i === this.elements.length - 1;
                    if (!isLast) {
                        this.setState({
                            index: this.state.index + 1
                        });
                    } else this.feedbackDidEnd();
                }, 500 * i);
            }
        });
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