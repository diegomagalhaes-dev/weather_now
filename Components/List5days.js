import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const List5days = ({ fiveDaysData }) => {
    const { list } = fiveDaysData;
    const [{ main: { feels_like } }] = list;
    return (
        <View>
            <Text>
                {feels_like}
            </Text>
        </View>
    )
}

export default List5days

const styles = StyleSheet.create({})
