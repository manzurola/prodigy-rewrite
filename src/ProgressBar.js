/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, Easing, Text} from "react-native";
import Star from "./Star";

const STAR_SIZE = 24;
const STAR_ROTATION = 22;
const STAR_ROTATION_DEG = STAR_ROTATION + 'deg';
const ANIMATION_TIME = 1000;

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);

        let childWidth = this.getChildWidth(this.props.barWidth, this.props.progress);
        // this.state = {
        //     progressWidthAnim: new Animated.Value(childWidth),
        //     starLeftAnim: new Animated.Value(this.getStarLeft(childWidth)),
        //     starRotateAnim: new Animated.Value(0),
        // };
        this.progressWidthAnim = new Animated.Value(childWidth);
        this.starLeftAnim = new Animated.Value(this.getStarLeft(childWidth));
        this.starRotateAnim = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.progress === nextProps.progress) return;

        console.log("ProgressBar nextProps.progress " + nextProps.progress);
        let childWidth = this.getChildWidth(this.props.barWidth, nextProps.progress);
        Animated.timing(
            this.progressWidthAnim,
            {
                toValue: childWidth,
                duration: ANIMATION_TIME,
                easing: Easing.linear,
            }
        ).start();
        Animated.timing(
            this.starLeftAnim,
            {
                toValue: this.getStarLeft(childWidth),
                duration: ANIMATION_TIME,
                easing: Easing.linear,
            }
        ).start();
        this.setState({
            starRotateAnim: new Animated.Value(0)
        }, () => {
            Animated.timing(
                this.starRotateAnim,
                {
                    toValue: 1, //due to interpolation
                    duration: ANIMATION_TIME,
                    easing: Easing.linear,
                }
            ).start();
        });

    }

    render() {
        let {progressWidthAnim, starLeftAnim} = this;

        // Second interpolate beginning and end values (in this case 0 and 1)
        console.log((STAR_ROTATION + 360) + "deg");
        const starSpin = this.starRotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [STAR_ROTATION_DEG, (STAR_ROTATION + 360) + "deg"]
        });

        return (
            <View style={styles.container}>
                <View style={[styles.bar, {width: this.props.barWidth}]}>
                    <Animated.View style={[styles.child, {width: progressWidthAnim}]}/>
                    <Star size={STAR_SIZE}
                          color={"#434343"}
                          style={{
                              ...styles.star,
                              left: starLeftAnim,
                              transform: [{rotate: starSpin}]
                          }}/>
                </View>
            </View>
        )
    }

    getStarLeft(childWidth) {
        return childWidth - STAR_SIZE / 2;
    }

    getChildWidth(barWidth, progress) {
        return barWidth * progress;
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
        transform: [{rotate: STAR_ROTATION}],
        backgroundColor: 'rgba(0,0,0,0)',
    }
};
