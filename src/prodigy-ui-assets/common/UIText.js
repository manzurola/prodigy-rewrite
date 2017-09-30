import React, {Component} from "react";
import {Text} from "react-native";

export default class UIText extends Component {

    render() {
        return (
            <Text style={[this.props.style, styles.text]}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = {
    text: {
        flex: 1,
        color: "#5B5A62",
        textAlign: "left",
        fontFamily: "josefin-sans-regular",
        fontSize: 20,
    }
};