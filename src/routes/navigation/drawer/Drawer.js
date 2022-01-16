import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import RootTabNavigator from '../tabs/Tabs'
import Login from '../../../scenes/login'
import { ProfileStackNavigator } from '../stacks'
import Signup from '../../../scenes/signin/Signup'

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
  <Drawer.Navigator
    initialRouteName="Login"
    drawerContent={DrawerMenuContainer}
  >
    <Drawer.Screen
      name="Home"
      component={RootTabNavigator}
      options={{ title: 'Start' }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{ title: 'Profil' }}
    />
    <Drawer.Screen
      name="Login"
      component={Login}
      options={{ title: 'Login' }}
    />
    <Drawer.Screen
      name="Signup"
      component={Signup}
      options={{ title: 'Signup' }}
    />
    {/* <Drawer.Screen
      name="blik"
      component={blik}
      options={{ title: 'BLIK' }}
    /> */}
  </Drawer.Navigator>
)

export default DrawerNavigator
