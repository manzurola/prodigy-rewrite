import React, {Component} from "react";
import {View} from "react-native";

export default class Block extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.children}>{this.props.children}</View>
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 0,
        margin: 10,
        // shadowColor: '#89818D',
        // shadowOffset: {
        //     width: 0,
        //     height: 7
        // },
        // shadowRadius: 3,
        // shadowOpacity: 1,
    },
    children: {
        borderRadius: 1,
        overflow: 'hidden',
    }
};