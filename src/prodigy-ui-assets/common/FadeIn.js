import React, {Component} from "react";
import {Easing, Animated} from "react-native";

export default class FadeIn extends Component {

    constructor(props){
        super(props);

        this.opacity = new Animated.Value(0);
        Animated.timing(
            this.opacity,
            {
                toValue: 1,
                duration: this.props.duration || 300,
                delay: this.props.delay || 0,
                easing: Easing.linear,
            }
        ).start();
    }

    render() {
        return(
            <Animated.View style={{opacity: this.opacity}}>
                {this.props.children}
            </Animated.View>
        )
    }
}