import React, { useState } from 'react'
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
} from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
})

const data = [
  {
    id: '1',
    date: '30.04.2021',
    category: 'Przychód',
    amount: '3000,00 PLN',
    title: 'Wynagrodzenie za miesiąc kwiecień 2021',
    account: 'Konto Oszczędnościowe',
    payerAccount: '45 2344',
    payerName: 'Firma XYZ',
    payerAddress: 'ul.Wojska Polskiego 1,Warszawa',
    recipientAccount: '28 9399',
    recipientName: 'Adam Kowalski',
    recipientAddress: 'ul.Kowalska 1,Warszawa',
  },
  {
    id: '2',
    date: '01.05.2021',
    category: 'Przychód',
    amount: '0.20 PLN',
    title: 'Naliczone odsetki',
    account: 'Konto Oszczędnościowe',
    payerAccount: '53 2723',
    payerName: 'MobileBank',
    payerAddress: 'ul.Krakowska 5,Kraków',
    recipientAccount: '28 9399',
    recipientName: 'Adam Kowalski',
    recipientAddress: 'ul.Kowalska 1,Warszawa',
  },
  {
    id: '3',
    date: '01.05.2021',
    category: 'Finanse',
    amount: '-0.05 PLN',
    title: 'Podatek od odsetek',
    account: 'Konto Oszczędnościowe',
    payerAccount: '28 9399',
    payerName: 'Adam Kowalski',
    payerAddress: 'ul.Kowalska 1,Warszawa',
    recipientAccount: '53 2723',
    recipientName: 'MobileBank',
    recipientAddress: 'ul.Krakowska 5,Kraków',
  },
  {
    id: '4',
    date: '05.05.2021',
    category: 'Dom i rachunki',
    amount: '-1000,00 PLN',
    title: 'Opłata za telefon',
    account: 'Konto Student',
    payerAccount: '28 9374',
    payerName: 'Adam Kowalski',
    payerAddress: 'ul.Kowalska 1,Warszawa',
    recipientAccount: '34 2384',
    recipientName: 'Telefonia S.A.',
    recipientAddress: 'ul.Zagórska 5,Warszawa',
  },
]

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

const History = ({ navigation, route }) => {
  const [account, setAccount] = useState('all')
  const [period, setPeriod] = useState('curr-month')
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
        onValueChange={(itemValue) => setAccount(itemValue)}
      >
        <Select.Item label="Wszystkie konta" value="all" />
        <Select.Item label="Konto Student" value="main" />
        <Select.Item label="Konto Oszczędnościowe" value="savings" />
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
        onValueChange={(itemValue) => setPeriod(itemValue)}
      >
        <Select.Item label="Bieżący miesiąc" value="curr-month" />
        <Select.Item label="Poprzedni miesiąc" value="prev-month" />
        <Select.Item label="Ostatnie 6 miesięcy" value="half-year" />
      </Select>
      <FlatList
        mt="4"
        w="100%"
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {
                transaction: item,
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
        keyExtractor={(item) => item.id}
      />
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
