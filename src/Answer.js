/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            correct: false
        }
    }

    render() {
        let containerStyle = this.state.correct ? styles.correctTextContainer : styles.textContainer;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={containerStyle}
                                  onPress={() => this.props.onPress({
                                      id: this.props.id
                                  })}>
                    {this.getBody()}
                </TouchableOpacity>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.input === nextProps.input) return;
        // if (nextProps.input.length > this.props.input.length) this.onTextAdded();

        const complete = this.props.answer.length === nextProps.input.length;
        this.setState({
            complete: complete,
        }, () => {
            if (complete) this.onComplete();
        });
    }

    onComplete() {
        this.props.onComplete({
            id: this.props.id,
            correct: this.state.correct
        });
    }

    onTextAdded() {
        this.props.onTextAdded();
    }

    getBody() {
        //show instructions if no words entered
        const isEmpty = this.props.input.length === 0;
        if (isEmpty) return <Text style={styles.instructionText}>{this.props.instructions}</Text>;

        let text = this.props.input[0];
        for (let i = 1; i < this.props.input.length; i++) {
            text += " " + this.props.input[i];
        }

        return <Text style={styles.chars}>{text}</Text>;
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "#5B5A62",
    },
    correctTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    textContainer: {
        justifyContent: 'center',
        // alignItems: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
        flexWrap: 'wrap',

    },
    text: {
        color: "#E3E3E3",
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-regular",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 30,
    },
    instructionText: {
        color: "#5B5A62",
        fontFamily: "josefin-sans-bold",
        fontSize: 24,
        textAlign: "left",
        lineHeight: 30,
    },
    correct: {
        backgroundColor: 'rgba(76,217,100)',
    }
};
