import React from "react";
import {StyleSheet, Text, View} from "react-native";
import GameData from "./src/GameData";

export default class App extends React.Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'josefin-sans-light': require('./assets/fonts/Josefin_Sans/JosefinSans-Light.ttf'),
            'cagliostro-regular': require('./assets/fonts/Cagliostro/Cagliostro-Regular.ttf')
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            <View style={styles.container}>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
