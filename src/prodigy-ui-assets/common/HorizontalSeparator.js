import React, {Component} from "react";
import {View} from "react-native";

export default class HorizontalSeparator extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}/>
        )
    }
}

const styles = {
    container: {
        height: 1,
        backgroundColor: "#CFCDD7",
    }
};