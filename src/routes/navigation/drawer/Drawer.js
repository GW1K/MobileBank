import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import RootTabNavigator from '../tabs/Tabs'
import Login from '../../../scenes/login'

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
    <Drawer.Screen
      name="Home"
      component={RootTabNavigator}
      options={{ title: 'Start' }}
    />
    <Drawer.Screen
      name="History"
      component={RootTabNavigator}
      options={{ title: 'Historia' }}
    />
    <Drawer.Screen
      name="Profile"
      component={RootTabNavigator}
      options={{ title: 'Profil' }}
    />
    <Drawer.Screen
      name="Login"
      component={Login}
      options={{ title: 'Login' }}
    />
    <Drawer.Screen
      name="blik"
      component={blik}
      options={{ title: 'BLIK' }}
    />
  </Drawer.Navigator>
)

export default DrawerNavigator
