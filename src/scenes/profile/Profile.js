import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import { Column, Heading, Row } from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
})

const Profile = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate('Login')
    })
  }

  console.log(auth.currentUser)

  return (
    <View style={styles.root}>
      <Row>
        <Heading mt={5}>Profil</Heading>
      </Row>
      <Column w="90%" mt="5" mb="5">
        <Heading size="md" mb="1">
          Nazwa użytkownika:
        </Heading>
        <Text style={{ fontSize: 20, marginBottom: 15 }}>
          {auth.currentUser.displayName}
        </Text>
        <Heading size="md" mb="1">
          Email:
        </Heading>
        <Text style={{ fontSize: 20, marginBottom: 15 }}>
          {auth.currentUser.email}
        </Text>
      </Column>
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
