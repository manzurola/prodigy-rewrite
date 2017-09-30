import React, {Component} from "react";
import {View} from "react-native";
import TimerMixin from "react-timer-mixin";

let reactMixin = require('react-mixin');

export default class Appear extends Component {
    constructor(props) {
        super(props);
        this.state = {appear: false}
        this.setTimeout(()=> {
            this.setState({appear: true})
        }, this.props.timeout);
    }

    render() {
        return (
            this.state.appear ? <View>{this.props.children}</View> : null
        )
    }
}
reactMixin(Appear.prototype, TimerMixin);