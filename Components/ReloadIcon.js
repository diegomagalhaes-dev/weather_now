import React from 'react'
import { Platform, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../Utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const ReloadIcon = ({load}) => {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

    return (
        <View style={styles.reloadIcon}>
            <Ionicons  onPress={load} name={reloadIconName} size={24} color={colors.DETAIS_COLOR} />
        </View>
    )
}

export default ReloadIcon

const styles = EStyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: '2rem',
        right: '1.2rem',
    }
})
