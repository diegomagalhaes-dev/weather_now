import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../Utils'


const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

const WeatherInfo = ({ currentWeather, unitySystem }) => {
    const {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather
    const { icon, main, description } = details;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={style.primaryInfo}>
            <Image style={style.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={style.weatherDescription}>{description}</Text>
            <Text style={style.textPrimary}>{temp}º</Text>
        </View>
    )
}

export default WeatherInfo

const style = StyleSheet.create({
    weatherIcon: {
        width: 100,
        height: 60
    },
    weatherDescription: {
        textTransform: 'capitalize',
        marginTop: 0,
        textAlign: 'center',
        fontFamily: 'Mulish_700Bold',
        fontSize: 22,
        marginBottom: 15,
        color: colors.DEFAULT_COLOR
    },
    textPrimary: {
        fontSize: 48,
        color: PRIMARY_COLOR,
        marginBottom: 20,
        fontFamily: 'Mulish_700Bold',
        color: colors.DEFAULT_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: "500",
        marginTop: 0
    },
    primaryInfo: {
        alignItems: 'center',
    },
    boardName: {
        alignItems: 'center'
    },
    
});