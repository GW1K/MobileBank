import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'

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

const Signin = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <VStack>
        <Box px="10" py="5" bg={colors.blue} borderRadius="10">
          <HeaderTitle></HeaderTitle>
        </Box>
        <Input mt="5"></Input>
        <Input mt="3" mb="10"></Input>
        <Button
          title="Signin"
          color={colors.lightBlue}
          backgroundColor={colors.blue}
          onPress={() => {
            navigation.navigate('Login', { from: 'Signin' })
          }}
        />
      </VStack>
    </View>
  )
}

Signin.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Signin.defaultProps = {
  navigation: { navigate: () => null },
}

export default Signin
