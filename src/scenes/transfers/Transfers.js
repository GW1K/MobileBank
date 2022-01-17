import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { colors } from 'theme'
import Button from 'components/Button'
import {
  Heading,
  Row,
  Select,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Input,
  Box,
  ScrollView,
  Spinner,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Collapse,
} from 'native-base'
import { auth, firestore } from '../../../config/firebase'
import { collection, setDoc, doc } from 'firebase/firestore'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    width: '98%',
    fontSize: 15,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 15,
    marginBottom: 30,
    width: '50%',
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: colors.lightBlue,
  },
})

const Transfers = ({ navigation }) => {
  const [account, setAccount] = useState('Konto Student')
  const [recipientAccount, setRecipientAccount] = useState(null)
  const [recipientName, setRecipientName] = useState(null)
  const [recipientAddress, setRecipientAddress] = useState(null)
  const [transferTitle, setTransferTitle] = useState(null)
  const [amount, setAmount] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [status, setStatus] = useState(false)

  const addTransfer = async () => {
    const transfersRef = collection(firestore, 'transfers')
    const currentDate = new Date()
    const formattedDate =
      ('00' + currentDate.getDate()).slice(-2) +
      '.' +
      ('00' + currentDate.getMonth() + 1).slice(-2) +
      '.' +
      ('0000' + currentDate.getFullYear()).slice(-4)
    await setDoc(doc(transfersRef, Date.now().toString()), {
      uid: auth.currentUser.uid,
      account: account,
      amount: amount,
      category: 'Finanse',
      date: formattedDate,
      payerAccount: null,
      payerName: null,
      recipientAccount: recipientAccount,
      recipientAddress: recipientAddress,
      recipientName: recipientName,
      title: transferTitle,
    })
  }

  const pushTransfer = () => {
    setLoading(true)
    addTransfer()
      .then(() => {
        setStatus(true)
      })
      .catch(() => {
        setStatus(false)
      })
      .finally(() => {
        setLoading(false)
        setShowAlert(true)
      })
  }

  return (
    <ScrollView>
      <Row style={styles.root}>
        <Heading mt={5}>Wykonaj transakcję</Heading>
        <Select
          mt={4}
          fontSize={14}
          selectedValue={account}
          minWidth="300"
          accessibilityLabel="Choose Account"
          placeholder="Wybierz konto"
          bg={colors.white}
          _selectedItem={{
            bg: colors.lightBlue,
            endIcon: <CheckIcon size="4" />,
          }}
          dropdownIcon={<ChevronDownIcon size="6" />}
          dropdownOpenIcon={<ChevronUpIcon size="6" />}
          dropdownCloseIcon={<ChevronDownIcon size="6" />}
          onValueChange={(account) => setAccount(account)}
        >
          <Select.Item label="Konto Student" value="Konto Student" />
          <Select.Item
            label="Konto Oszczędnościowe"
            value="Konto Oszczędnościowe"
          />
        </Select>
        <Text style={styles.title}>Dane odbiorcy:</Text>
        <Box alignItems="flex-start" w="90%">
          <Text>Numer rachunku:</Text>
          <Input
            style={styles.input}
            onChangeText={(v) => setRecipientAccount(v)}
          ></Input>
          <Text>Nazwa odbiorcy:</Text>
          <Input
            style={styles.input}
            onChangeText={(v) => setRecipientName(v)}
          ></Input>
          <Text>Adres odbiorcy:</Text>
          <Input
            style={styles.input}
            onChangeText={(v) => setRecipientAddress(v)}
          ></Input>
          <Text>Tytuł:</Text>
          <Input
            style={styles.input}
            onChangeText={(v) => setTransferTitle(v)}
          ></Input>
          <Text>Kwota:</Text>
          <Input
            style={styles.input}
            onChangeText={(v) => setAmount('-' + v)}
          ></Input>
        </Box>
        {status ? (
          <Collapse isOpen={showAlert}>
            <Alert w="100%" status="success">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      Transakcja została dokonana.
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
        ) : (
          <Collapse isOpen={showAlert}>
            <Alert w="100%" status="error">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      Transakcja nie powiodła się.
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
        )}
        {isLoading ? (
          <Box mt="15" mb="30">
            <Spinner color={colors.lightPurple} size={'lg'} />
          </Box>
        ) : (
          <Button
            title="Wykonaj"
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => {
              pushTransfer()
            }}
          />
        )}
      </Row>
    </ScrollView>
  )
}

Transfers.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Transfers.defaultProps = {
  navigation: { navigate: () => null },
}

export default Transfers
