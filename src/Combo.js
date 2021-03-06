/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import Feedback from "./Feedback";

export default class Combo extends Feedback {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        borderWidth: 1,
        borderColor: "white",
    },
    text: {
        color: "white"
    },
};
