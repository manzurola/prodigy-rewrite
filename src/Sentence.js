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
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        marginBottom: 10,
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#A09DB0',
        padding: 20,
        borderBottomWidth: 5,
        borderTopWidth: 5,
        borderColor: '#CFCDD7',
    },
    text: {
        color: "white",
        fontFamily: "josefin-sans-regular",
        fontSize: 30,
        textAlign: "left",
        lineHeight: 30,
        letterSpacing: 0.2
    }
};
