import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firebase'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Profile = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate('Login')
    })
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Profile</Text>

      <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Details', { from: 'Profile' })
        }}
      />
      <Button
        style={{ marginTop: 10 }}
        textStyle={{ fontSize: 18 }}
        title="Wyloguj się"
        color={colors.lightBlue}
        backgroundColor={colors.blue}
        onPress={() => {
          handleSignOut()
        }}
      />
    </View>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Profile.defaultProps = {
  navigation: { navigate: () => null },
}

export default Profile
