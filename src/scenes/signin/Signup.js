import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Button from 'components/Button'
import {
  Box,
  Icon,
  Input,
  VStack,
  Collapse,
  Alert,
  HStack,
  IconButton,
  CloseIcon,
  Spinner,
} from 'native-base'
import { colors } from 'theme'
import HeaderTitle from '../../routes/navigation/stacks/HeaderTitle'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { auth } from '../../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

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
  const [isLoading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [username, setUsername] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [togglePassword, setTogglePassword] = useState(false)

  const handleClick = () => setTogglePassword(!togglePassword)

  const signUp = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: username })
        navigation.navigate('Login')
      })
      .catch(() => {
        setShowAlert(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <View style={styles.root}>
      <VStack w="85%">
        <Box px="10" py="5" bg={colors.darkPurple} borderRadius="10">
          <HeaderTitle></HeaderTitle>
        </Box>
        <Input
          mt="5"
          placeholder="Nazwa użytkownika"
          bgColor={colors.white}
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
          bgColor={colors.white}
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
          mb="5"
          bgColor={colors.white}
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
        <Collapse isOpen={showAlert} mb="3">
          <Alert w="100%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Wprowadzono nieprawiłowe dane. Sprawdź poprawoność adresu
                    email. Hasło powinno mieć miniumim 6 znaków.
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={() => {
                    setShowAlert(false)
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        </Collapse>
        {isLoading ? (
          <Box mt="15" mb="30">
            <Spinner color={colors.lightPurple} size={'lg'} />
          </Box>
        ) : (
          <Box>
            <Button
              textStyle={{ fontSize: 18 }}
              title="Zarejestruj się"
              color={colors.lightBlue}
              backgroundColor={colors.blue}
              onPress={() => {
                signUp()
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
          </Box>
        )}
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
