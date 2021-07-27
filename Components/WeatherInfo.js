import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { colors } from '../Utils'
import EStyleSheet from 'react-native-extended-stylesheet';
import WeatherpHour from './WeatherpHour';
import WeatherDetails from '../Components/WeatherDetails';

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

const WeatherInfo = ({ currentWeather, unitySystem }) => {
    const [deshData, setDeshData] = useState(currentWeather['current'])

    const { temp, weather: [{ icon, description }] } = deshData;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <>
            <View style={styles.content}>
                <View style={styles.board}>
                    <View style={styles.primaryInfo}>
                        <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
                        <Text style={styles.weatherDescription}>{description}</Text>
                        <Text style={styles.textPrimary}>{Math.round(temp)}º</Text>
                    </View>
                    <WeatherDetails deshData={deshData} unitySystem={unitySystem} />
                </View>
            </View>
            <View>
                <WeatherpHour currentWeather={currentWeather} setDeshData={setDeshData} />
            </View>
        </>
    )

}

export default WeatherInfo

const styles = EStyleSheet.create({
    weatherIcon: {
        width: '12rem',
        height: '8rem',
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
        width: '100%'
    },
    boardName: {
        alignItems: 'center',
    },
    boardInfo: {
        width: '100%',
        backgroundColor: 'black'
    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    board: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: '20%',
        width: '20rem',
        backgroundColor: colors.BOARD_COLOR,
        borderRadius: '.8rem'
    },

});