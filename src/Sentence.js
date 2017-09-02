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
        // height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom:20,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#B2B2B2',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 40,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        padding: 20,
    },
    text: {
        color: "#434343",
        fontFamily: "josefin-sans-bold",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 30,
        letterSpacing: 0.2
    }
};
