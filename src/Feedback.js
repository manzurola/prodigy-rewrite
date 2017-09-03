/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";

export default class Feedback extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }

    componentDidMount() {

    }
}

const styles = {
    container: {
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
    text: {
        color: "white"
    },
};
