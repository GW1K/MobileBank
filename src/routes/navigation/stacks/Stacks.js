import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'
import Home from 'scenes/home'
import Profile from 'scenes/profile'
import History from 'scenes/history'
import Details from 'scenes/details'
import Transfers from 'scenes/transfers'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
      }}
    />
  </Stack.Navigator>
)

export const HistoryStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="History"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="History"
      component={History}
      options={({ navigation }) => ({
        title: 'History',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="TransferDetails"
      component={Details}
      options={{
        title: 'Szczegóły płatności',
      }}
    />
  </Stack.Navigator>
)

export const ProfileStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'Profile',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
      }}
    />
  </Stack.Navigator>
)

export const TransfersStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Transfers"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Transfers"
      component={Transfers}
      options={({ navigation }) => ({
        title: 'Płatności',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
      }}
    />
  </Stack.Navigator>
)
