import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import WeatherInfo from '../Components/WeatherInfo';
import UnitsPicker from '../Components/UnitsPicker';
import { colors } from '../Utils'
import ReloadIcon from '../Components/ReloadIcon';
import WeatherDetails from '../Components/WeatherDetails';
import getCountryName from '../Utils/ConvertToNameCountry';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location'
import List5days from '../Components/List5days';

const WEATHER_API_KEY = 'b3dd48c52ebbab270398c3c1747dc11a'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const BASE_URL2 = (lat, long, unitySystem) => `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=5&appid=${WEATHER_API_KEY}`

const Deshboard = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitySystem, setUnitySystem] = useState('metric')
    const [fiveDaysData, setFiveDaysData] = useState(null)

    useEffect(() => {
        load()
    }, [unitySystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        setFiveDaysData(null)

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('O aplicativo necessita da sua localização para fornecer os dados adequadamente!')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords;

            const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitySystem}&appid=${WEATHER_API_KEY}&lang=${Localization.locale}`

            
            const response = await fetch(weatherUrl)
            
            const fiveDaysResponse = await fetch(BASE_URL2(latitude, longitude))

            const result = await response.json()

            const fiveDaysResult = await fiveDaysResponse.json()

            if (response.ok && fiveDaysResponse.ok) {
                setCurrentWeather(result)
                setFiveDaysData(fiveDaysResult)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    if (currentWeather && fiveDaysData) {
        const { name, sys: { country } } = currentWeather;
        const countryName = getCountryName(country);
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.main}>
                    <UnitsPicker unitySystem={unitySystem} setUnitySystem={setUnitySystem} />
                    <ReloadIcon load={load} />
                    <View style={styles.content}>
                        <Text style={styles.name}>{name}, {countryName}</Text>
                        <View style={styles.board}>
                            <WeatherInfo currentWeather={currentWeather} unitySystem={unitySystem} />
                            <WeatherDetails currentWeather={currentWeather} unitySystem={unitySystem} />
                        </View>
                    </View>
                </View>
            </View>
        );
    } else if (errorMessage) {
        return (<View style={styles.container}>
            <ReloadIcon load={load} />
            <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
            <StatusBar style="auto" />
        </View>)
    } else {
        return (<View style={styles.container}>
            <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    board: {
        paddingHorizontal: 85,
        paddingTop: 30,
        backgroundColor: colors.BOARD_COLOR,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 22,
        marginBottom: 25,
        textTransform: 'capitalize',
        fontFamily: 'Mulish_700Bold',
        color: colors.PRIMARY_COLOR,
        textAlign: 'center'
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 0
    }
});