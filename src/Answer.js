/**
 * Created by guym on 20/08/2017.
 */
import React, {Component} from "react";
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Text,
    TouchableHighlight
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complete: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.textContainer} onPress={this.props.onPress}>
                    {this.getBody()}
                </TouchableHighlight>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        const complete = this.props.answer.length === nextProps.input.length;
        this.setState({
            complete: complete
        }, () => {
            if (complete) this.onComplete();
        });
    }

    onComplete() {
        console.log("Answer - onComplete");
        let result = {
            input: {},
            answer: this.props.answer
        };
        for (let i = 0; i < this.props.answer.length; i++) {
            let expected = this.props.answer[i];
            let actual = this.props.input[i];
            result.input[actual] = expected === actual;
        }
        this.props.onComplete(result);
    }


    getBody() {
        //show instructions if no words entered
        const isEmpty = this.props.input.length === 0;
        if (isEmpty) return <Text style={styles.instructionText}>{this.props.instructions}</Text>;

        let text = this.props.input[0];
        for (let i = 1; i < this.props.input.length; i++) {
            console.log("input [" + i + "]: [" + this.props.input[i] + "]");
            text += " " + this.props.input[i];
        }

        return <Text style={styles.text}>{text}</Text>;
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin:10,
    },
    textContainer: {
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#767676',
        borderRadius: 5,
        marginRight: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        padding: 20,
    },
    text: {
        color: "#E3E3E3",
        fontFamily: "josefin-sans-bold",
        fontSize: 24,
        textAlign: "right",
    },
    newText: {
        fontSize: 30,
        color: "white",
        fontFamily: "josefin-sans-bold",
        textAlign: "center",
        fontWeight: "bold",
    },
    oldText: {
        fontSize: 30,
        color: "white",
        fontFamily: "josefin-sans-light",
        textAlign: "center"
    },
    instructionText: {
        color: "#E3E3E3",
        fontFamily: "josefin-sans-bold-italic",
        fontSize: 16,
        textAlign: "center",
        // paddingTop: 20,
        // paddingBottom: 20,
        // paddingRight: 20,
    }
};
