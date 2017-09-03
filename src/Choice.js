/**
 * Created by guym on 22/08/2017.
 */
import React, {Component} from "react";
import {
    Text,
    TouchableHighlight,
} from "react-native";

export default class Choice extends Component {

    state = {
        pressed: false
    };

    render() {
        return (
            <TouchableHighlight style={[styles.choiceContainer, this.state.pressed && styles.choiceContainerPressed]}
                                onPress={(event) => this.onPress(event)}
                                onHideUnderlay={() => {
                                    this.setState({pressed: false})
                                }}
                                onShowUnderlay={() => {
                                    this.setState({pressed: true})
                                }}>
                <Text style={[styles.choiceText, this.state.pressed && styles.choiceTextPressed]}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        )
    }

    onPress() {
        console.log("onPress of choice: [" + this.props.text + "]");
        this.props.onPress();
    }
}

const styles = {
    choiceListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceContainer: {
        // margin: 5,
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
    }
};