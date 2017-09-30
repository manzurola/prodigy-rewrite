/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import CheckMark from "./CheckMark";

export default class AnswerCompleteFeedback extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View style={[styles.container, this.props.style]}>
                <CheckMark/>
                <Text style={styles.text}>{"Correct Answer!"}</Text>
            </Animated.View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        // overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "#434343",
        fontFamily: "josefin-sans-regular",
        fontSize: 30,
        paddingLeft: 20,
    },
};
