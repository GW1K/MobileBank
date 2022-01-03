import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { colors } from 'theme'
import { Pressable, Row, Circle, Box } from 'native-base'

const Home = ({ navigation }) => {
  return (
    <Row style={styles.root}>
      <Row space="md">
        <Pressable>
          {({ isPressed }) => {
            return (
              <Circle
                size={180}
                bg={isPressed ? colors.lightBlue : colors.white}
                borderWidth={4}
                borderColor={colors.blue}
                style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}
              >
                <Box _text={styles.circleTitle}>Account balance</Box>
                <Box _text={styles.circleDesc}>120.00 PLN</Box>
              </Circle>
            )
          }}
        </Pressable>
        <Pressable>
          {({ isPressed }) => {
            return (
              <Circle
                size={160}
                bg={isPressed ? colors.lightBlue : colors.white}
                borderWidth={4}
                borderColor={colors.blue}
                style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}
              >
                <Box _text={styles.circleTitle}>Savings</Box>
                <Box _text={styles.circleDesc}>50.00 PLN</Box>
              </Circle>
            )
          }}
        </Pressable>
      </Row>
      <Pressable>
        {({ isPressed }) => {
          return (
            <Circle
              size={150}
              bg={isPressed ? colors.lightBlue : colors.white}
              borderWidth={4}
              borderColor={colors.blue}
              style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}
            >
              <Box _text={styles.circleTitle}>Credit cards</Box>
              <Box _text={styles.circleDesc}>2</Box>
            </Circle>
          )
        }}
      </Pressable>
      <Text style={styles.overallBalanceTitle}>
        You have <Text style={styles.overallBalance}>170.00 PLN</Text>
      </Text>
    </Row>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  overallBalanceTitle: {
    fontSize: 24,
    marginTop: 30,
  },
  overallBalance: {
    color: colors.gray,
  },
  circleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circleDesc: {
    fontSize: 20,
    color: colors.gray,
  },
})

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
