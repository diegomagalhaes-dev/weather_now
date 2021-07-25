import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Deshboard from './Pages/Deshboard';

export default function App() {
  return (<View style={styles.container}>
    <Deshboard />
    <StatusBar style="auto" />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
