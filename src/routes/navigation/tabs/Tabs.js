import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
import Home from 'scenes/home'
import Profile from 'scenes/profile'
import History from 'scenes/history'

// stack navigators
import { HomeStackNavigator, HistoryStackNavigator } from '../stacks'

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

export const HomeTabNavigator = () => (
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
          default:
            return <View />
        }
      },
    })}
    initialRouteName="Home"
    tabBarOptions={tabBarOptions}
    swipeEnabled={false}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="History" component={HistoryStackNavigator} />
  </Tab.Navigator>
)

export const ProfileTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        return (
          <FontIcon
            name="user"
            color={focused ? colors.lightPurple : colors.gray}
            size={20}
            solid
          />
        )
      },
    })}
    tabBarOptions={tabBarOptions}
    swipeEnabled={false}
  >
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
)
