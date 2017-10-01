import React, {Component} from "react";
import {View} from "react-native";
import UIText from "../common/UIText";

export default class ChatBubble extends Component {
    render() {
        return (
            <View  style={[styles.container, this.props.side === "right" ? styles.right : styles.left, this.props.style]}>
                <UIText>{this.props.text}</UIText>
            </View>
        )
    }
}


const styles = {
    container: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'white'
    },
    left: {
        borderBottomLeftRadius: 0,
    },
    right: {
        borderBottomRightRadius: 0,
    }
};