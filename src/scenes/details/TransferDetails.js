import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, Text } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Box, Column, Heading, Row, ScrollView, View } from 'native-base'
import { firestore, storage } from '../../../config/firebase'
import {
  collection,
  query,
  where,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  imageWrapper: {
    marginTop: 10,
    width: 300,
    height: 400,
  },
})

const TransferDetails = ({ route, navigation }) => {
  const transfer = route?.params?.transfer
  const [isUploading, setIsUploading] = useState(false)
  const [imageUri, setImageUri] = useState()

  useEffect(() => {
    tryLoadPhoto()
  }, [])

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

  const tryLoadPhoto = () => {
    getDownloadURL(ref(storage, transfer.id))
      .then((url) => {
        setImageUri(url)
      })
      .catch((err) => {})
  }

  const takePhoto = () => {
    ImagePicker.launchCameraAsync({
      aspect: [4, 3],
    }).then((pickerResult) => {
      handleImagePicked(pickerResult)
    })
  }

  const handleImagePicked = async (pickerResult) => {
    try {
      setIsUploading(true)
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri)
        setImageUri(uploadUrl)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsUploading(false)
    }
  }

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        resolve(xhr.response)
      }
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })
    const fileRef = ref(storage, transfer.id)
    const result = await uploadBytes(fileRef, blob)
    return await getDownloadURL(fileRef)
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
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            {transfer.category}
          </Text>
          {imageUri ? (
            <Box>
              <Heading size="md" mb="1">
                Zdjęcie:
              </Heading>
              <Image source={{ uri: imageUri }} style={styles.imageWrapper} />
            </Box>
          ) : (
            <Box></Box>
          )}
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
            style={{ width: '50%' }}
            textStyle={{ fontSize: 18 }}
            title="Dodaj zdjęcie"
            color={colors.lightBlue}
            backgroundColor={colors.green}
            onPress={() => {
              takePhoto()
            }}
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
