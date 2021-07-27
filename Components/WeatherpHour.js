import React from 'react'
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import convertHour from '../Utils/CurrentHour';
import { colors } from '../Utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const WeatherpHour = ({ currentWeather, setDeshData }) => {
    const { hourly } = currentWeather;

    const renderItem = ({ item }) => {
        const {
            dt,
            temp,
            weather: [{ description, icon }]
        } = item
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        if ((convertHour(dt).split(':')[0] % 4) === 0) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setDeshData(() => item)
                    }}
                    style={styles.secondaryBoard}
                >
                    <Text style={styles.infoText}>{convertHour(dt)}</Text>
                    <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
                    <Text style={styles.infoText}>{Math.round(temp)}º</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.result}>
            <FlatList
                data={hourly}
                renderItem={renderItem}
                keyExtractor={item => `${item.dt}`}
                horizontal

            />
        </View>
    )
}

export default WeatherpHour

const styles = EStyleSheet.create({
    result: {
        width: '100%',
        marginLeft: '2.5rem',
    },
    weatherIcon: {
        width: 35,
        height: 35
    },
    secondaryBoard: {
        marginTop: '2.5rem',
        paddingHorizontal: '.2rem',
        paddingVertical: '.5rem',
        backgroundColor: colors.BOARD_COLOR,
        borderRadius: '.4rem',
        marginRight: '.5rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        fontFamily: 'Mulish_600SemiBold',
        color: colors.DEFAULT_COLOR
    }
})
