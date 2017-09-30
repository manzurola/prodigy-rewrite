import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {Font} from 'expo';
import {TabNavigator} from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import LessonScreen from './src/screens/LessonScreen';

import Game from './src/Game';
import GameData from './src/GameData';
import TransformActivityDemo from "./src/prodigy-ui-assets/activities/TransformActivityDemo";

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
            'josefin-sans-regular': require('./assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
            // 'josefin-sans-regular': require('./assets/fonts/TheKingsOfTheHouse/TheKingsoftheHouse-Regular.ttf'),

            'cagliostro-regular': require('./assets/fonts/Cagliostro/Cagliostro-Regular.ttf'),

            'kingsofthehouse-regular': require('./assets/fonts/TheKingsOfTheHouse/TheKingsoftheHouse-Regular.ttf')
        });

        this.setState({fontLoaded: true});
    }

    render() {
        const MainNavigator = TabNavigator({
            welcome: {screen: WelcomeScreen},
            auth: {screen: AuthScreen},
            main: {
                screen: TabNavigator({
                    lesson: {screen: LessonScreen}
                })
            }
        });
        return (
            <View style={styles.container}>
                <TransformActivityDemo/>
                {/*<StatusBar hidden={true}/>*/}
                {/*{*/}
                {/*this.state.fontLoaded ? (<Game data={GameData}/>) : null*/}
                {/*}*/}
                {/*<MainNavigator/>*/}
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
