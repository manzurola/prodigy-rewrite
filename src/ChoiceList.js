/**
 * Created by guym on 22/08/2017.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native";

export default class ChoiceList extends Component {
    constructor(props) {
        super(props);

        let choiceIndices = [];
        for (let i = 0; i < this.props.choices.length; i++) {
            choiceIndices.push(0);
        }

        this.state = {
            index: 0,
            choiceIndices: choiceIndices
        };
    }

    render() {
        return (
            <View style={styles.choiceListContainer} onPress={() => this.onPress()}>
                {this.getChoices()}
            </View>
        )
    }

    onChoice(index) {
        console.log("ChoiceList - onChoice " + index);
        let newChoiceIndices = this.state.choiceIndices.slice();
        const choiceIndex = newChoiceIndices[index];
        newChoiceIndices[index]++;
        this.setState({
            choiceIndices: newChoiceIndices
        }, () => {
            this.props.onChoice(this.props.choices[index][choiceIndex])
        });
    }

    onPress() {
        console.log("onPress of Answer");
        this.props.onPress();
    }

    getChoices() {
        let choices = [];
        for (let i = 0; i < this.props.choices.length; i++) {
            let text = this.props.choices[i][this.state.choiceIndices[i]];
            console.log("creating choice with word " + text);
            choices.push(<Choice key={i}
                                 text={text}
                                 onPress={() => this.onChoice(i)}/>)
        }
        return choices;
    }
}

class Choice extends Component {

    render() {
        return (
            <TouchableHighlight style={styles.choiceContainer} onPress={(event) => this.onPress(event)}>
                <Text style={styles.choiceText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }

    onPress() {
        console.log("onPress of choice: [" + this.props.text + "]");
        this.props.onPress();
    }

}

const styles = {
    choiceListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceContainer: {
        // flex: 1,
        margin: 5,
        width: 230,
        height: 50,
        borderRadius: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#434343',
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    choiceText: {
        fontSize: 20,
        color: "#E3E3E3",
        paddingLeft: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-bold",
        textAlign: "left"
    }
};