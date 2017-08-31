/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import Star from "./Star";

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const childFlex = this.props.progress / 100;
        const dummyFlex = 1 - childFlex;
        return (
            <View style={styles.container}>
                <View style={[styles.textContainer, {flex: childFlex}]}/><View style={{flex: dummyFlex}}/>
                <Star/>
            </View>
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
        backgroundColor: '#434343',
    },
};
