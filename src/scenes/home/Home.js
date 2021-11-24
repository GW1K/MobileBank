import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Row, Circle, Box } from 'native-base'

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
    marginBottom: 10,
  },
})

const Home = ({ navigation }) => (
  <Row style={styles.root}>
    <Row space="md">
      <Circle size={180} bg="blue.400">
        <Box
          _text={{
            fontWeight: 'bold',
            fontSize: '2xl',
            color: 'white',
          }}
        >
          Account balance
        </Box>
        <Box
          _text={{
            fontWeight: 'bold',
            fontSize: 'xl',
            color: 'white',
          }}
        >
          120,00 PLN
        </Box>
      </Circle>
      <Circle size={160} bg="green.500">
        <Box
          _text={{
            fontWeight: 'bold',
            fontSize: '2xl',
            color: 'white',
          }}
        >
          Savings
        </Box>
        <Box
          _text={{
            fontWeight: 'bold',
            fontSize: 'xl',
            color: 'white',
          }}
        >
          50,00 PLN
        </Box>
      </Circle>
    </Row>
    <Circle size={150} bg="amber.400">
      <Box
        _text={{
          fontWeight: 'bold',
          fontSize: '2xl',
          color: 'white',
        }}
      >
        Credit cards
      </Box>
      <Box
        _text={{
          fontWeight: 'bold',
          fontSize: 'xl',
          color: 'white',
        }}
      >
        2
      </Box>
    </Circle>
    <Text style={styles.title}>Home</Text>
    <Button
      title="Go to Details"
      color="white"
      backgroundColor={colors.lightPurple}
      onPress={() => {
        navigation.navigate('Details', { from: 'Home' })
      }}
    />
  </Row>
)

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
