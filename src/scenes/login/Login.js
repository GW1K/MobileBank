import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from 'components/Button'
import { Box, Icon, Input, VStack } from 'native-base'
import { colors } from 'theme'
import HeaderTitle from '../../routes/navigation/stacks/HeaderTitle'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
})

const Login = ({ navigation }) => {
  const [togglePassword, setTogglePassword] = useState(false)

  const handleClick = () => setTogglePassword(!togglePassword)

  return (
    <View style={styles.root}>
      <VStack>
        <Box px="10" py="5" bg={colors.darkPurple} borderRadius="10">
          <HeaderTitle></HeaderTitle>
        </Box>
        <Input
          mt="5"
          placeholder="Login"
          InputRightElement={
            <Icon
              as={<FontIcon name="user"></FontIcon>}
              size={25}
              mr={2}
            ></Icon>
          }
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
          placeholder="Hasło"
        />
        <Button
          textStyle={{ fontSize: 18 }}
          title="Log In"
          color={colors.lightBlue}
          backgroundColor={colors.blue}
          onPress={() => {
            navigation.navigate('Home', { from: 'Login' })
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
