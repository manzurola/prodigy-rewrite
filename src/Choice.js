/**
 * Created by guym on 22/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, Easing, Text, TouchableHighlight} from "react-native";
import TimerMixin from "react-timer-mixin";
let reactMixin = require('react-mixin');

export default class Choice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            feedbackIndex: 0,
        };
        this.widthAnim = new Animated.Value(200);
    }


    render() {
        return (
            <View style={styles.container}>
                {/*{this.getFeedbackCombo()}*/}
                <Animated.View
                    style={[
                        styles.touchableContainer,
                        {width: this.widthAnim}
                    ]}>
                    <TouchableHighlight
                        style={[
                            styles.touchable,
                            this.state.pressed && styles.touchablePressed,
                            this.props.style,
                        ]}
                        onPress={(event) => this.onPress(event)}
                        onHideUnderlay={() => {
                            this.setState({pressed: false})
                        }}
                        onShowUnderlay={() => {
                            this.setState({pressed: true})
                        }}>
                        <Text
                            style={[
                                styles.text,
                                this.state.pressed && styles.textPressed,
                                this.props.textStyle
                            ]}>
                            {this.props.text}
                        </Text>
                    </TouchableHighlight>
                </Animated.View>
                {/*{this.getFeedbackText()}*/}
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
        return <Text style={styles.feedbackCombo}>{this.getFeedbackEntry().combo}</Text>
    }

    getFeedbackText() {
        if (!this.props.playFeedback) return null;
        return <Text style={styles.feedbackText}>{this.getFeedbackEntry().text}</Text>
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
                duration: 170,
                easing: Easing.elastic(1),
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
                duration: 200,
                easing: Easing.linear,
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
        width: 200,
        height: 45,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    touchableContainer: {
        // width: 204,
        // height: 44,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 45 / 2,
        backgroundColor: '#434343',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    touchablePressed: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#434343',
        borderRadius: 45 / 2,
        backgroundColor: '#E3E3E3',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    text: {
        fontSize: 24,
        color: "#E3E3E3",
        paddingLeft: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-regular",
        textAlign: "left"
    },
    textPressed: {
        fontSize: 24,
        color: "#434343",
        paddingLeft: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-regular",
        textAlign: "left"
    },
    choiceSeparator: {
        height: 20,
    },
    feedbackCombo: {},
    feedbackText: {
        marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0)'
    }
};