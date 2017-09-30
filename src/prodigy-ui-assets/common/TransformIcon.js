import React, {Component} from "react";
import {View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default class TransformIcon extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <MaterialIcons name="transform"
                               size={this.props.size || 20}
                               color={this.props.color || "#CFCDD7"}
                               style={styles.icon}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        width: 54,
        height: 54,
        borderRadius: 54 / 2,
        backgroundColor: '#434343',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    icon: {
        backgroundColor: 'rgba(0,0,0,0)',
        top: (54 - 26) / 2,
        left: (54 - 26) / 2,
    },
};