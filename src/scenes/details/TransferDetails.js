import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Column, Heading, Row, ScrollView, View } from 'native-base'
import { firestore } from '../../../config/firebase'
import {
  collection,
  query,
  where,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
})

const TransferDetails = ({ route, navigation }) => {
  const transfer = route?.params?.transfer

  const cancelTransfer = () => {
    const transfersRef = collection(firestore, 'transfers')
    deleteDoc(doc(transfersRef, transfer.id))
      .then(() => {
        navigation.goBack()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Row>
          <Heading mt={5}>Szczegóły płatności</Heading>
        </Row>
        <Column w="90%" mt="5" mb="5">
          <Heading size="md" mb="1">
            Identyfikator:
          </Heading>
          <Text style={{ fontSize: 20, marginBottom: 15 }}>{transfer.id}</Text>
          <Heading size="md" mb="1">
            Z rachunku:
          </Heading>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>
            {transfer.payerAccount}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.account}
          </Text>
          <Heading size="md" mb="1">
            Nazwa i adres płatnika:
          </Heading>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {transfer.payerName}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.payerAddress}
          </Text>
          <Heading size="md" mb="1">
            Na rachunek:
          </Heading>
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            {transfer.recipientAccount}
          </Text>
          <Heading size="md" mb="1">
            Nazwa i adres odbiorcy:
          </Heading>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {transfer.recipientName}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.recipientAddress}
          </Text>
          <Heading size="md" mb="1">
            Tytuł:
          </Heading>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.title}
          </Text>
          <Heading size="md" mb="1">
            Data transakcji:
          </Heading>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.date}
          </Text>
          <Heading size="md" mb="1">
            Kwota transakcji:
          </Heading>
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.amount}
          </Text>
          <Heading size="md" mb="1">
            Kategoria:
          </Heading>
          <Text style={{ fontSize: 18 }}>{transfer.category}</Text>
        </Column>
        <Button
          style={{ marginTop: 10, marginBottom: 40 }}
          textStyle={{ fontSize: 18 }}
          title="Anuluj płatność"
          color={colors.lightBlue}
          backgroundColor={colors.red}
          onPress={() => {
            cancelTransfer()
          }}
        />
        <Row w="80%" justifyContent="space-between" mb="5">
          <Button
            style={{ width: '45%' }}
            textStyle={{ fontSize: 18 }}
            title="Zrób zdjęcie"
            color={colors.lightBlue}
            backgroundColor={colors.green}
            onPress={navigation.goBack}
          />
          <Button
            style={{ width: '45%' }}
            textStyle={{ fontSize: 18 }}
            title="Wróć"
            color={colors.lightBlue}
            backgroundColor={colors.blue}
            onPress={navigation.goBack}
          />
        </Row>
      </View>
    </ScrollView>
  )
}

TransferDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

TransferDetails.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

export default TransferDetails
