import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Button from 'components/Button'
import { Box, Icon, Input, VStack } from 'native-base'
import { colors } from 'theme'
import HeaderTitle from '../../routes/navigation/stacks/HeaderTitle'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  signupbutton: {
    marginTop: 10,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.blue,
  },
})

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home')
      }
    })
    return unsubscribe
  }, [])

  const handleClick = () => setTogglePassword(!togglePassword)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <View style={styles.root}>
      <VStack>
        <Box px="10" py="5" bg={colors.darkPurple} borderRadius="10">
          <HeaderTitle></HeaderTitle>
        </Box>
        <Input
          mt="5"
          placeholder="Email"
          InputRightElement={
            <Icon
              as={<FontIcon name="user"></FontIcon>}
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
          title="Zaloguj"
          color={colors.lightBlue}
          backgroundColor={colors.blue}
          onPress={() => {
            handleLogin()
          }}
        />
        <Button
          style={styles.signupbutton}
          textStyle={{ fontSize: 18 }}
          title="Zarejestruj się"
          color={colors.blue}
          onPress={() => {
            navigation.navigate('Signup')
          }}
        />
      </VStack>
    </View>
  )
}

Login.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Login.defaultProps = {
  navigation: { navigate: () => null },
}

export default Login
