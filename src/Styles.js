/**
 * Created by guym on 24/06/2017.
 */

import {
    StyleSheet
} from "react-native";

const STYLES = StyleSheet.create({
    gameScreen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:'rgba(118, 113, 213, 0.9)',
        // backgroundColor: '#F5FCFF',
        backgroundColor: '#FAF8F4'
    },
    questionDeck: {
        flex: 0.8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    questionContainer: {
        flex: 0.8
    },
    header: {
        flex: 0.1,
        borderWidth: 1
    },
    footer: {
        flex: 0.05,
        borderWidth: 1
    },
    instructions: {
        flex: 0.1,
        justifyContent: 'center'
    },
    instructionsText: {
        fontSize: 14,
        textAlign: 'center'
    },
    bodyContainer: {
        flex: 0.3,
        justifyContent: 'center'
    },
    bodyText: {
        // fontFamily: 'TheKingsoftheHouse-Regular',
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 120
    },
    answerWordText: {
        padding: 2,
        fontSize: 20,
        textAlign: 'center',
        color: "black",
        textDecorationStyle: 'solid'
    },
    choicesContainer: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10
    },
    choice: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    choicePressed: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    choiceText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    choiceTextPressed: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    answerContainer: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answer: {
        position: 'absolute',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        minHeight: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        width: 320
    }
});

export default STYLES