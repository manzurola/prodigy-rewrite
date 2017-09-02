/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import Star from "./Star";

const STAR_SIZE = 24;

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let childWidth = this.props.barWidth * this.props.progress;

        return (
            <View style={styles.container}>
                <View style={[styles.bar, {width: this.props.barWidth}]}>
                    <View style={[styles.child, {width: childWidth}]}/>
                    <Star size={STAR_SIZE}
                          color={"#434343"}
                          style={[styles.star, {left: childWidth - STAR_SIZE / 2}]}/>
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
        backgroundColor: '#B2B2B2',
        marginLeft: 50,
        marginRight: 50,
    },
    child: {
        position: 'absolute',
        backgroundColor: '#767676',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        top: 0,
        left: 0,
        height: 6,
    },
    star: {
        position: 'absolute',
        zIndex: 99,
        top: -STAR_SIZE / 2.5,
        transform: [{rotate: '22deg'}],
        backgroundColor: 'rgba(0,0,0,0)',
    }
};
