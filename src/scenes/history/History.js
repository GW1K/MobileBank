import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
import {
  Heading,
  Row,
  Select,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FlatList,
  Box,
  HStack,
  VStack,
  Spacer,
  Spinner,
} from 'native-base'
import { firestore } from '../../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
})

const History = ({ navigation, route }) => {
  const getCategoryIconName = (category) => {
    switch (category) {
      case 'Przychód':
        return 'dollar-sign'
      case 'Finanse':
        return 'coins'
      case 'Dom i rachunki':
        return 'house-user'
    }
  }

  const isDateBetween = (from, curr, to) => {
    let fromTmp = new Date(from)
    let currTmp = new Date(curr)
    let toTmp = new Date(to)
    return currTmp >= fromTmp && currTmp <= toTmp
  }

  const currentMonthFilter = (date) => {
    let dateTmp = String(date).split('.')
    let currentDate = new Date()
    return isDateBetween(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1),
      Date.UTC(dateTmp[2], dateTmp[1] - 1, dateTmp[0]),
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    )
  }

  const lastMonthFilter = (date) => {
    let dateTmp = String(date).split('.')
    let currentDate = new Date()
    return isDateBetween(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      Date.UTC(dateTmp[2], dateTmp[1] - 1, dateTmp[0]),
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 0),
    )
  }

  const getTransfers = async () => {
    const transfersRef = collection(firestore, 'transfers')
    const querySnapshot = await getDocs(transfersRef)
    let result = []
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    })
    if (account != 'all') {
      result = result.filter((t) => t.account == account)
    }
    if (period == 'curr-month') {
      result = result.filter((t) => currentMonthFilter(t.date))
    } else if (period == 'prev-month') {
      result = result.filter((t) => lastMonthFilter(t.date))
    }
    return result
  }

  const [account, setAccount] = useState('all')
  const [period, setPeriod] = useState('curr-month')
  const [isLoading, setLoading] = useState(true)
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    getTransfers()
      .then((result) => {
        setTransfers(result)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [account, period])

  return (
    <Row style={styles.root}>
      <Heading mt={5}>Historia transakcji</Heading>
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
        <Select.Item label="Wszystkie konta" value="all" />
        <Select.Item label="Konto Student" value="Konto Student" />
        <Select.Item
          label="Konto Oszczędnościowe"
          value="Konto Oszczędnościowe"
        />
      </Select>
      <Select
        mt={2}
        fontSize={14}
        selectedValue={period}
        minWidth="300"
        accessibilityLabel="Choose Period"
        placeholder="Wybierz okres"
        bg={colors.white}
        _selectedItem={{
          bg: colors.lightBlue,
          endIcon: <CheckIcon size="4" />,
        }}
        dropdownIcon={<ChevronDownIcon size="6" />}
        dropdownOpenIcon={<ChevronUpIcon size="6" />}
        dropdownCloseIcon={<ChevronDownIcon size="6" />}
        onValueChange={(period) => setPeriod(period)}
      >
        <Select.Item label="Bieżący miesiąc" value="curr-month" />
        <Select.Item label="Poprzedni miesiąc" value="prev-month" />
      </Select>
      {isLoading ? (
        <Box mt={20}>
          <Spinner color={colors.lightPurple} size={'lg'} />
        </Box>
      ) : (
        <FlatList
          mt="4"
          w="100%"
          data={transfers}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  transfer: item,
                  from: route.name,
                })
              }}
            >
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: colors.gray,
                }}
                borderColor="coolGray.200"
                p="4"
              >
                <HStack>
                  <FontIcon
                    name={getCategoryIconName(item.category)}
                    size={30}
                  ></FontIcon>
                  <VStack flexShrink="1" alignItems="flex-start" ml="4">
                    <Text>{item.date}</Text>
                    <Text>{item.category}</Text>
                    <Heading size="sm">{item.title}</Heading>
                    <Text>{item.account}</Text>
                  </VStack>
                  <Spacer />
                  <Heading size="sm">{item.amount}</Heading>
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(transfer) => transfer.id}
        />
      )}
    </Row>
  )
}

History.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

History.defaultProps = {
  navigation: { navigate: () => null },
}

export default History
