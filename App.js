import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Deshboard from './Screens/Deshboard';
import AppLoading from 'expo-app-loading';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_900Black,
} from '@expo-google-fonts/mulish';


export default function App() {
  let [fontsLoaded, error] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_700Bold,
    Mulish_600SemiBold,
    Mulish_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Deshboard />
      <StatusBar style="auto" />
      <View style={styles.view}></View>
    </View>)
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view:{
    marginTop: '1rem'
  }
});
