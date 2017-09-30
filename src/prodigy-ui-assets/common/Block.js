import React, {Component} from "react";
import {View} from "react-native";

export default class Block extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        // overflow: 'hidden',
        margin: 10,
        shadowColor: '#A09DB0',
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowRadius: 3,
        shadowOpacity: 1,
    }
};