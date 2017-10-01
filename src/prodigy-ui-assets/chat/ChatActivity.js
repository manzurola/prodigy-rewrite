import React, {Component} from "react";
import {Dimensions, LayoutAnimation, ScrollView, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";
import TextAnswerInput from "./PredictiveTextAnswerInput";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CustomLayoutLinear = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
    // delete: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    // },
};

export default class ChatActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardOpen: false,
        };
        this.contentHeight = 0;
        this.scrollViewHeight = 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.scrollView]}>
                    <ScrollView
                        ref='scrollView'
                        onContentSizeChange={(w, h) => this.contentHeight = h}
                        // onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}>
                    >
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"1"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"2"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"3"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"4"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"5"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"6"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"7"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"8"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"9"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"10"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"11"}/>
                        <ChatBubble style={styles.leftChatBubble} side={"left"} text={"12"}/>
                    </ScrollView>
                </View>
                <HorizontalSeparator/>
                <TextAnswerInput
                    style={styles.answer}
                    choices={this.props.choices}
                    placeholderText={this.props.instructions}
                    onAnswerChange={(newAnswer) => this.onAnswerChange(newAnswer)}
                    onKeyboardDidShow={() => this.onKeyboardDidShow()}
                />
            </View>
        )
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onKeyboardDidShow() {
        console.log("keyboard did show");
        this.setState({
            keyboardOpen: true,
        }, () => this.scrollToBottom());
    }

    scrollToBottom(animated = false) {
        const scrollHeight = this.contentHeight - (SCREEN_HEIGHT - 70);
        this.refs.scrollView.scrollTo(scrollHeight);

        // const scrollHeight = this.contentHeight - this.scrollViewHeight;
        // if (scrollHeight > 0) {
        //     const scrollResponder = this.refs.scrollView.getScrollResponder();
        //     scrollResponder.scrollResponderScrollTo({x: 0, scrollHeight, animated});
        // }
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollView: {
        // position: 'absolute',
        // flex: 1,
        // bottom: 70,
        // height: SCREEN_HEIGHT - 70,
        // width: SCREEN_WIDTH,
        // justifyContent: 'flex-start',
        // height: 100,
        borderWidth: 3,
    },
    block: {
        // width: 320,
    },
    targetSentenceText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    answer: {},
    leftChatBubble: {
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
