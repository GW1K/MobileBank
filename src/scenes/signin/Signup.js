import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Button from 'components/Button'
import { Box, Icon, Input, VStack } from 'native-base'
import { colors } from 'theme'
import HeaderTitle from '../../routes/navigation/stacks/HeaderTitle'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  signinbutton: {
    marginTop: 10,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.blue,
  },
})

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)

  const handleClick = () => setTogglePassword(!togglePassword)

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <View style={styles.root}>
      <VStack>
        <Box px="10" py="5" bg={colors.darkPurple} borderRadius="10">
          <HeaderTitle></HeaderTitle>
        </Box>
        <Input
          mt="5"
          placeholder="Nazwa użytkownika"
          InputRightElement={
            <Icon
              as={<FontIcon name="user"></FontIcon>}
              size={25}
              mr={2}
            ></Icon>
          }
          onChangeText={(v) => {
            setUsername(v)
          }}
        ></Input>
        <Input
          mt="3"
          placeholder="Email"
          InputRightElement={
            <Icon
              as={<FontIcon name="envelope"></FontIcon>}
              size={25}
              mr={2}
            ></Icon>
          }
          onChangeText={(v) => {
            setEmail(v)
          }}
        ></Input>
        <Input
          mt="3"
          mb="10"
          type={togglePassword ? 'text' : 'password'}
          InputRightElement={
            <TouchableOpacity onPress={handleClick}>
              <Icon
                as={
                  <FontIcon
                    name={togglePassword ? 'eye' : 'eye-slash'}
                  ></FontIcon>
                }
                size={25}
                mr={2}
              ></Icon>
            </TouchableOpacity>
          }
          onChangeText={(v) => {
            setPassword(v)
          }}
          placeholder="Hasło"
        />
        <Button
          textStyle={{ fontSize: 18 }}
          title="Zarejestruj się"
          color={colors.lightBlue}
          backgroundColor={colors.blue}
          onPress={() => {
            signUp()
            navigation.navigate('Login')
          }}
        />
        <Button
          style={styles.signinbutton}
          textStyle={{ fontSize: 18 }}
          title="Zaloguj się"
          color={colors.blue}
          onPress={() => {
            navigation.navigate('Login')
          }}
        />
      </VStack>
    </View>
  )
}

Signup.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Signup.defaultProps = {
  navigation: { navigate: () => null },
}

export default Signup
