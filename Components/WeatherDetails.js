import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '../Utils'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import EStyleSheet from 'react-native-extended-stylesheet';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

i18n.translations = {
    en: {
        sa: 'Feels Like',
        h: 'humidity',
        v: 'wind speed',
        p: 'pressure'
    },
    'pt-BR': {
        sa: 'Sensação',
        h: 'humidade',
        v: 'ventos',
        p: 'pressão'
    },
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const WeatherDetails = ({ deshData, unitySystem }) => {
    const { humidity, feels_like, pressure, wind_speed } = deshData

    const windSpeed = unitySystem === 'metric' ? `${Math.round(wind_speed)} m/s` : `${Math.round(wind_speed)} mph`

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{
                    ...styles.weatherDetailsBox, borderTopWidth: .5,
                    borderTopColor: colors.DEFAULT_COLOR,
                }}><View style={styles.weatherDetailsRow}>
                        <View style={styles.graph}>
                            <FontAwesome5 name='thermometer-empty' size={25} color={colors.DEFAULT_COLOR} />
                            <View style={{ ...styles.weatherDetailsItems, marginLeft: 24 }}>
                                <Text style={styles.text}>{i18n.t('sa')}</Text>
                                <Text style={styles.textSecondary}>{feels_like}º</Text></View></View>
                    </View>
                </View>
                <View style={{
                    ...styles.weatherDetailsBox, borderTopWidth: .5,
                    borderTopColor: colors.DEFAULT_COLOR,
                    borderLeftWidth: .5,
                    borderLeftColor: colors.DEFAULT_COLOR,
                }}>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.graph}>
                            <MaterialCommunityIcons name='water' size={25} color={colors.DEFAULT_COLOR} />
                            <View style={{ ...styles.weatherDetailsItems, marginLeft: 18 }}>
                                <Text style={styles.text}>{i18n.t('h')}</Text>
                                <Text style={styles.textSecondary}>{humidity}%</Text></View></View>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.weatherDetailsRow, }}>
                <View style={{
                    ...styles.weatherDetailsBox, borderTopWidth: .5,
                    borderTopColor: colors.DEFAULT_COLOR,
                }}><View style={styles.weatherDetailsRow}>
                        <View style={styles.graph}>
                            <MaterialCommunityIcons name='weather-windy' size={25} color={colors.DEFAULT_COLOR} />
                            <View style={{ ...styles.weatherDetailsItems, marginLeft: 18 }}>
                                <Text style={styles.text}>{i18n.t('v')}</Text>
                                <Text style={styles.textSecondary}>{windSpeed}</Text></View></View>
                    </View>
                </View>
                <View style={{
                    ...styles.weatherDetailsBox, borderTopWidth: .5,
                    borderTopColor: colors.DEFAULT_COLOR,
                    borderLeftWidth: .5,
                    borderLeftColor: colors.DEFAULT_COLOR,
                }}>
                    <View style={styles.weatherDetailsRow}>
                        <View style={styles.graph}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name='speedometer' size={25} color={colors.DEFAULT_COLOR} /></View>
                            <View style={{ ...styles.weatherDetailsItems, marginLeft: 12 }}>
                                <Text style={styles.text}>{i18n.t('p')}</Text>
                                <Text style={styles.textSecondary}>{pressure} hPa</Text></View></View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WeatherDetails

const styles = EStyleSheet.create({
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Mulish_400Regular',
        color: colors.DEFAULT_COLOR,
        fontSize: 12,
        letterSpacing: 0.5
    },
    weatherDetails: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherDetailsBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherDetailsItems: {
    },
    icon: {
        width: 30,
    },
    graph: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '.5rem',
        width: '10rem',
    },
    textSecondary: {
        fontFamily: 'Mulish_700Bold',
        fontSize: 12,
        marginTop: 5,
        color: colors.DEFAULT_COLOR,
    },
})
