import React from "react";
import {StyleSheet, Text, View, StatusBar} from "react-native";
import { Font } from 'expo';

import GameData from "./src/GameData";
import Game from "./src/Game";

export default class App extends React.Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'josefin-sans-light': require('./assets/fonts/Josefin_Sans/JosefinSans-Light.ttf'),
            'josefin-sans-light-italic': require('./assets/fonts/Josefin_Sans/JosefinSans-LightItalic.ttf'),
            'josefin-sans-bold': require('./assets/fonts/Josefin_Sans/JosefinSans-SemiBold.ttf'),
            'josefin-sans-bold-italic': require('./assets/fonts/Josefin_Sans/JosefinSans-SemiBoldItalic.ttf'),

            'cagliostro-regular': require('./assets/fonts/Cagliostro/Cagliostro-Regular.ttf')
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {
                    this.state.fontLoaded ? (<Game data={GameData}/>) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
