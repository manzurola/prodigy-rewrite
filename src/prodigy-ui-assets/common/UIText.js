import React, {Component} from "react";
import {Text} from "react-native";

export default class UIText extends Component {

    render() {
        return (
            <Text style={[styles.text, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = {
    text: {
        color: "#000000",
        fontFamily: "josefin-sans-regular",
        fontSize: 17,
    }
};