/**
 * Created by guym on 29/07/2017.
 */
import React, {Component} from "react";
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default class Star extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <FontAwesome name="star" size={this.props.size} color={this.props.color}
                style={{
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 1,
                        height: 1
                    },
                    shadowRadius: 3,
                    shadowOpacity: 0.5,
                }}/>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        height: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#FFD728',
    },
};
