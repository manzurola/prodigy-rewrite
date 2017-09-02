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
        let childFlex;
        let dummyFlex;

        if (this.props.progress === 0) {
            childFlex = 0;
            dummyFlex = 1;
        } else if (this.props.progress === 100) {
            childFlex = 1;
            dummyFlex = 0;
        } else {
            const starWidthCompensation = 5.5;
            childFlex = (this.props.progress + starWidthCompensation) / 100;
            dummyFlex = 1 - childFlex;
        }

        return (
            <View style={styles.container}>
                <View style={styles.bar}>
                    <View style={[styles.child, {flex: childFlex}]}/>
                    <Star style={{zIndex: 99, top: -11, left: -11}}/>
                    <View style={{flex: dummyFlex}}/>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        height: 6,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        flexDirection: 'row',
        marginLeft: 50,
        marginRight: 50,
    },
    child: {
        backgroundColor: '#434343',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    dummyChild: {
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
};
