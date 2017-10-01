import React, {Component} from "react";
import Background from "../common/Background";
import TransformActivity from "../activities/TransformActivity";
import ChatActivity from "./ChatActivity";

class ChatActivityDemo extends Component {
    render () {
        return (
            <Background>
                <ChatActivity {...data}/>
            </Background>
        )
    }
}

export default ChatActivityDemo;

let data ={
    instructions: "Put into the plural",
    targetSentence: "A dog is cute",
    answer: "Dogs are cute",
    choices: [
        "Dogs is a cute",
        // "Dog are cute",
        "Dogs are cute",
        "A dogs are"
    ]

};