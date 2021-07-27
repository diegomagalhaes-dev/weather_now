import React from 'react'
import { View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import EStyleSheet from 'react-native-extended-stylesheet';

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

const styles = EStyleSheet.create({
    unitySystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: '-2rem',
            },
            android: {
                top: '2rem',
            }
        }),
        left: '.8rem',
        height:'2rem',
        width: '5.5rem',
    }
})
