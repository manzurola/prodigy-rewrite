/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const childFlex = this.props.progress / 100;
        const dummyFlex = 1 - childFlex;
        return (
            <View style={styles.container}>
                <View style={[styles.child, {flex: childFlex}]}/><View style={{flex: dummyFlex}}/>
            </View>
        )
    }
}

const styles = {
    container: {
        borderColor: 'black',
        borderRadius: 30,
        borderWidth: 1,
        height: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
        margin: 10,
        flexDirection: 'row'
    },
    child: {
        flex: 1,
        // position: 'absolute',
        // left: 0,
        // top: 0,
        // bottom: 0,
        // width: 100,
        backgroundColor: '#FFD728',
    },
};
