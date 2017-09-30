import React, {Component} from "react";
import {Text, TouchableHighlight, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import UIText from "./UIText";
import FadeIn from "./FadeIn";
let reactMixin = require('react-mixin');

export default class TextButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            text: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.props.text) {
            this.setText(nextProps.text);
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                        {this.state.text}
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    setText(value) {
        let text = [];
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            text.push(<FadeIn delay={30 * i}><UIText>{char}</UIText></FadeIn>)
        }
        this.setState({
            text: text
        })
    }
}
reactMixin(TextButton.prototype, TimerMixin);

const styles = {
    container: {
        width: 200,
        height: 45,
        justifyContent: 'center',
        flexDirection: 'row',
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
};