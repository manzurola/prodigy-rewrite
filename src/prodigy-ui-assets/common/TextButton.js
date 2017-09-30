import React, {Component} from "react";
import {TouchableHighlight, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import UIText from "./UIText";
import FadeIn from "./FadeIn";

let reactMixin = require('react-mixin');

export default class TextButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            chars: []
        };

        let chars = this.getChars(props.text);
        this.state.chars = chars;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chars !== this.props.text) {
            let chars = this.getChars(nextProps.text);
            this.setState({
                chars: chars
            })
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={[
                    styles.container,
                    this.state.pressed && styles.pressed,
                    this.props.style,
                ]}
                onPress={(event) => this.onPress(event)}
                onHideUnderlay={() => {
                    this.setState({pressed: false})
                }}
                onShowUnderlay={() => {
                    this.setState({pressed: true})
                }}>
                <View style={styles.textContainer}>
                    {this.state.chars}
                </View>
            </TouchableHighlight>
        )
    }

    onPress() {
        this.props.onPress();
    }

    getChars(value) {
        let chars = [];
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            chars.push(<FadeIn delay={30 * i}>
                <UIText style={[
                    styles.text,
                    this.state.pressed && styles.textPressed,
                    !!this.props.textStyle,
                    this.state.pressed && this.props.textPressedStyle,
                ]}>
                    {char}
                </UIText>
            </FadeIn>)
        }
        return chars;
    }
}
reactMixin(TextButton.prototype, TimerMixin);

const styles = {
    container: {
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
    pressed: {
        backgroundColor: '#E3E3E3',
    },
    text: {
        // borderWidth: 5,
        fontSize: 17,
        color: "#E3E3E3",
    },
    textPressed: {
        color: "#434343",
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    }
};