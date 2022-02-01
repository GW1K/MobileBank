import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Button
} from 'react-native'
import { colors } from 'theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bialy,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
})

const Blik = ({ navigation }) => {

    generateRandomNumber = () => {

        const randomNumber = Math.floor(Math.random() * 999999) + 100000 ;

    }
    
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>BLIK</Text>
      <Button title="Generuj nowy kod BLIK" onPress={ generateRandomNumber() } />
    </View>
  )
}

export default Blik
