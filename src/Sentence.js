/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, Dimensions, Text} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontFamily: "josefin-sans-light",
        fontSize: 30,
        textAlign: "center"
    }
};
