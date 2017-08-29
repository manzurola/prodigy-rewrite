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
        this.state = {
            index: 0
        };
    }

    render() {
        return (
            <View style={styles.choiceListContainer} onPress={()=>this.onPress()}>
                {this.getChoices()}
            </View>
        )
    }

    onChoice(word) {
        this.setState({
            index: this.index + 1
        });
        this.props.onChoice(word);
    }

    onPress() {
        console.log("onPress of Answer");
        this.props.onPress();
    }

    getChoices() {
        let choices = [];
        for (let row = 0; row < this.props.choices.length; row++) {
            choices.push(<Choice key={row}
                                 index={this.state.index}
                                 words={this.props.choices[row]}
                                 onPress={(data) => this.onChoice(data)}/>)
        }
        return choices;
    }
}

class Choice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    render() {
        return (
            <TouchableHighlight style={styles.choiceContainer} onPress={(event) => this.onPress(event)}>
                <Text style={styles.choiceText}>{this.getWord()}</Text>
            </TouchableHighlight>
        )
    }

    onPress(event) {
        console.log("onPress of choice: [" + this.getWord() + "]");
        this.setState({
            index: this.state.index + 1
        });
        this.props.onPress(this.getWord());
    }

    getWord() {
        console.log("Choice - getWord");
        return this.props.words[this.state.index];
    }
}

const styles = {
    choiceListContainer: {
        flex: 1,
    },
    choiceContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    choiceText: {
        fontSize: 24,
        color: "white",
        fontFamily: "josefin-sans-bold",
        textAlign: "center"
    }
};