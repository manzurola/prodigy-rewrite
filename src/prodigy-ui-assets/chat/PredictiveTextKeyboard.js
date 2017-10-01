import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import TextButton from "../common/TextButton";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PredictiveTextKeyboard extends Component {

    constructor(props){
        super(props);
        console.log("Predictive keyboard");
        console.log(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index) {
            console.log("keyboard componentWillReceiveProps");
            console.log(nextProps);
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {[this.getTextButton(0), this.getTextButton(1), this.getTextButton(2)]}
            </View>
        )
    }

    onKeyDidPress(text) {
        this.props.onKeyDidPress(text);
    }

    getTextButton(i) {
        let text = this.props.choices[i];
        console.log("button text: " + text);

        return <TextButton
            style={styles.button}
            text={text}
            onPress={() => this.onKeyDidPress(text)}
        />;
    }

}

const styles = {
    container: {
    },
};