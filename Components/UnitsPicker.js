import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const UnitsPicker = ({ unitySystem, setUnitySystem }) => {
    return (
        <View style={styles.unitySystem}>
            <Picker selectedValue={unitySystem} onValueChange={(item) => setUnitySystem(item)} mode='dropdown' itemStyle={{ fontFamily: 'Mulish_900Black', fontSize: 12 }}>
                <Picker.Item label="ºC" value='metric' />
                <Picker.Item label="ºF" value='imperial' />
            </Picker>
        </View>
    )
}

export default UnitsPicker

const styles = StyleSheet.create({
    unitySystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30,
            }
        }),
        left: 20,
        height: 50,
        width: 85,
    }
})
