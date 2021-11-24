import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import {
  HomeStackNavigator,
  ProfileStackNavigator,
  HistoryStackNavigator,
} from '../stacks'
import { HomeTabNavigator } from '../tabs'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerMenuContainer}>
    <Drawer.Screen name="Home" component={HomeTabNavigator} />
    <Drawer.Screen name="History" component={HomeTabNavigator} />
    <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
  </Drawer.Navigator>
)

export default DrawerNavigator
