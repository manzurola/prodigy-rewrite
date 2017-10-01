import React from "react";
import {LayoutAnimation, StyleSheet, UIManager, View} from "react-native";
import {Font} from 'expo';
import {TabNavigator} from 'react-navigation';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import LessonScreen from './src/screens/LessonScreen';
import TransformActivityDemo from "./src/prodigy-ui-assets/activities/TransformActivityDemo";
import ChatActivityDemo from "./src/prodigy-ui-assets/chat/ChatActivityDemo";


const CustomLayoutLinear = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5,
    },
    // delete: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    // },
};

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
                {this.state.fontLoaded ? (<ChatActivityDemo/>) : null}
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
