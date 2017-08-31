/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default class Star extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FontAwesome name="star" size={32} color="#FFFF00" />
        )
    }
}

const styles = {
    container: {
        flex: 1,
        height: 10,
        marginTop: 10,
        marginBottom : 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#FFD728',
    },
};
