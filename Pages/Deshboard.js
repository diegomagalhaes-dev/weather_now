import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import api from '../Services/api';

const WEATHER_API_KEY = 'b3dd48c52ebbab270398c3c1747dc11a'
const DATA_LANG = 'pt_br'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const Deshboard = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitySystem, setUnitySystem] = useState('metric')

    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('O aplicativo necessita da sua localização para fornecer os dados adequadamente!')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords;

            const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitySystem}&appid=${WEATHER_API_KEY}&lang=${DATA_LANG}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    if (currentWeather) {
        const { main: { temp }, } = currentWeather

        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.main}>
                    <Text>{temp}</Text>
                </View>
            </View>
        );
    } else {
        return (<View style={styles.container}>
            <Text>{errorMessage}</Text>
            <StatusBar style="auto" />
        </View>)
    }
}

export default Deshboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1
    }
});