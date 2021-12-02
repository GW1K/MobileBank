import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Button
} from 'react-native'
import Button from 'components/Button'
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

const Home = ({ navigation }) => (

    /*GenerateRandomNumber=()=>
    {

        RandomNumber = Math.floor(Math.random() * 100) + 1 ;

        setState({

            NumberHolder : RandomNumber

        })
}*/
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>BLIK</Text>
    <Button title="Generuj kod BLIK" onPress={/*GenerateRandomNumber*/} />
  </View>
)

export default blik