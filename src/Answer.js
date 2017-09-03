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
            complete: false,
            correct: false
        }
    }

    render() {
        let containerStyle = this.state.correct ? styles.correctTextContainer : styles.textContainer;
        return (
            <View style={styles.container}>
                <TouchableHighlight style={containerStyle}
                                    onPress={() => this.props.onPress({
                                        id: this.props.id
                                    })}>
                    {this.getBody()}
                </TouchableHighlight>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.input === nextProps.input) return;

        console.log("Answer - componentWillReceiveProps");
        console.log(nextProps);
        const complete = this.props.answer.length === nextProps.input.length;
        let correct = true;
        for (let i = 0; i < this.props.answer.length; i++) {
            let expected = this.props.answer[i];
            let actual = nextProps.input[i];
            console.log("expected [" + expected + "], actual [" + actual + "]");
            correct &= expected === actual;
        }
        console.log("Answer - componentWillReceiveProps: complete [" + complete + "], correct [" + correct + "]");
        this.setState({
            complete: complete,
            correct: correct
        }, () => {
            if (complete) this.onComplete();
        });
    }

    onComplete() {
        console.log("Answer - onComplete [" + this.state.correct + "]");
        this.props.onComplete({
            id: this.props.id,
            correct: this.state.correct
        });
    }


    getBody() {
        //show instructions if no words entered
        const isEmpty = this.props.input.length === 0;
        if (isEmpty) return <Text style={styles.instructionText}>{this.props.instructions}</Text>;

        let text = this.props.input[0];
        for (let i = 1; i < this.props.input.length; i++) {
            text += " " + this.props.input[i];
        }

        return <Text style={styles.text}>{text}</Text>;
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    correctTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(88,86,214, 1)',
        borderRadius: 5,
        marginLeft: 40,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#767676',
        borderRadius: 5,
        marginLeft: 40,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        flexWrap: 'wrap',
    },
    text: {
        color: "#E3E3E3",
        backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "josefin-sans-bold",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 30,
    },
    instructionText: {
        color: "#E3E3E3",
        fontFamily: "josefin-sans-light-italic",
        fontSize: 20,
        textAlign: "left",
        lineHeight: 30,
    },
    correct: {
        backgroundColor: 'rgba(76,217,100)',
    }
};
