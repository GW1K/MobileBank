import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Row } from 'native-base'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

const styles = StyleSheet.create({
  logo: {
    fontSize: 32,
    color: colors.lightBlue,
    marginRight: 8,
  },
  brandName: {
    fontSize: 30,
    color: colors.lightBlue,
  },
})

const HeaderTitle = () => (
  <Row>
    <Text style={styles.brandName}>
      <FontIcon style={styles.logo} name="adversal"></FontIcon>
      MobileBank
    </Text>
  </Row>
)

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
