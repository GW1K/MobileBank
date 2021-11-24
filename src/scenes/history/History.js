import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Row } from 'native-base'

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

const History = ({ navigation }) => (
  <Row style={styles.root}>
    <Text style={styles.title}>History</Text>
    <Button
      title="Go to Details"
      color="white"
      backgroundColor={colors.lightPurple}
      onPress={() => {
        navigation.navigate('Details', { from: 'History' })
      }}
    />
  </Row>
)

History.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

History.defaultProps = {
  navigation: { navigate: () => null },
}

export default History
