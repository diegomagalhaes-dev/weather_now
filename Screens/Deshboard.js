import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import WeatherInfo from '../Components/WeatherInfo';
import UnitsPicker from '../Components/UnitsPicker';
import { colors } from '../Utils'
import ReloadIcon from '../Components/ReloadIcon';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location'
import convertLocalization from '../Utils/ConvertLocalization';
import EStyleSheet from 'react-native-extended-stylesheet';

const WEATHER_API_KEY = ''

const BASE_URL = (lat, lon, unity, lang) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unity}&appid=${WEATHER_API_KEY}&lang=${lang}`

EStyleSheet.build({
    $fontColor: 'green',
    $bgColor: '#e6e6e6',
    $rem: 16,
});
const Deshboard = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitySystem, setUnitySystem] = useState('metric')

    useEffect(() => {
        load()
    }, [unitySystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('O aplicativo necessita da sua localização para fornecer os dados adequadamente!')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords;

            const lang = convertLocalization(Localization.locale);

            const weatherUrl = BASE_URL(latitude, longitude, unitySystem, lang);

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
        const { timezone } = currentWeather;
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.main}>
                    <UnitsPicker unitySystem={unitySystem} setUnitySystem={setUnitySystem} />
                    <ReloadIcon load={load} />
                    <View style={styles.content}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.name}>{timezone.split('/')[1]}</Text>
                            <WeatherInfo currentWeather={currentWeather} unitySystem={unitySystem} />
                        </ScrollView>
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

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    name: {
        fontSize: 22,
        marginBottom: '1rem',
        textTransform: 'capitalize',
        fontFamily: 'Mulish_700Bold',
        color: colors.PRIMARY_COLOR,
        textAlign: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '4rem',
    },
});