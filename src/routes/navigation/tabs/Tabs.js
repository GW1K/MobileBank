import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

// stack navigators
import {
  HomeStackNavigator,
  HistoryStackNavigator,
  TransfersStackNavigator,
} from '../stacks'

// ------------------------------------
// Constants
// ------------------------------------

const Tab = createBottomTabNavigator()

const tabBarOptions = {
  activeTintColor: colors.lightPurple,
  inactiveTintColor: colors.gray,
  style: {
    // backgroundColor: 'white',
    // borderTopColor: 'gray',
    // borderTopWidth: 1,
    // paddingBottom: 5,
    // paddingTop: 5,
  },
}

// ------------------------------------
// Navigators
// ------------------------------------

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Home':
            return (
              <FontIcon
                name="home"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          case 'History':
            return (
              <FontIcon
                name="history"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          case 'Transfers':
            return (
              <FontIcon
                name="wallet"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          default:
            return <View />
        }
      },
    })}
    initialRouteName="Home"
    tabBarOptions={tabBarOptions}
    swipeEnabled={false}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{ title: 'Start' }}
    />
    <Tab.Screen
      name="History"
      component={HistoryStackNavigator}
      options={{ title: 'Histora' }}
    />
    <Tab.Screen
      name="Transfers"
      component={TransfersStackNavigator}
      options={{ title: 'Płatności' }}
    />
  </Tab.Navigator>
)

export default BottomTabNavigator
