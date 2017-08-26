/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";

export default class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldTexts: [],
            newTexts: [],
            hasText: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.texts.length <= this.props.texts.length) return;

        let newTexts = nextProps.texts.filter((e, i) => {
            return i >= this.state.oldTexts.texts.length
        });
        let oldTexts = this.state.oldTexts.concat(this.state.newTexts);

        this.setState({
            oldTexts: oldTexts,
            newTexts: newTexts,
            hasText: true
        });
    }

    render() {
        let oldTexts = [];
        let newTexts = [];

        for (text in this.state.oldTexts) {
            oldTexts.push(<Text style={styles.oldText}/>);
        }
        for (text in this.state.newTexts) {
            newTexts.push(<Text style={styles.newText}/>);
        }

        return (
            <View style={styles.container}>
                {oldTexts.concat(newTexts)}
            </View>
        )
    }
}

const styles = {
    container: {
        borderWidth: 3,
        borderColor: "white",
    },
    newText: {
        color: "white"
    },
    oldText: {
        color: "white"
    },
    instructionText: {
        color: "white"
    }
};
