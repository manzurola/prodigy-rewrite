/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";

export default class Sentence extends Component {

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
        color: "white",
        fontFamily: "josefin-sans-light"
    },
};
