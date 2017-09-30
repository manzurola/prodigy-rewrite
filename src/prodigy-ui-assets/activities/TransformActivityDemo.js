import React, {Component} from "react";
import Background from "../common/Background";
import TransformActivity from "./TransformActivity";

class TransformActivityDemo extends Component {
    render () {
        return (
            <Background>
                <TransformActivity {...data}/>
            </Background>
        )
    }
}

export default TransformActivityDemo;

let data ={
    instructions: "Put into the plural",
    targetSentence: "A dog is cute",
    answer: "Dogs are cute",
    choices: [
        "Dogs is a cute",
        // "Dog are cute",
        "Dogs are cute",
        "A dogs are cute"
    ]

};