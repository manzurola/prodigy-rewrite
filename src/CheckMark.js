/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {Animated} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default class CheckMark extends Component {

    render() {
        return (
            <Animated.View style={[styles.container, this.props.style]}>
                <FontAwesome name="check" size={26} color="#E3E3E3"
                             style={styles.icon}/>
            </Animated.View>
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
