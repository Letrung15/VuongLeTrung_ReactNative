import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import DetailScreen from '../screens/DetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import OrderScreen from '../screens/OrderScreen'
import ProductListScreen from '../screens/ProductListScreen'
import ProductsScreen from '../screens/ProductsScreen'
import CategoryScreen from '../screens/CategoryScreen'

const Stack = createStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName='homescreen'
        screenOptions={{
            headerStyle:{
                backgroundColor:"#91c4f8"
            },
            headerShown:false
        }}
        >
        <Stack.Screen name='homescreen' component={HomeScreen} />
        <Stack.Screen name='detailscreen' component={DetailScreen} />
        <Stack.Screen name='productlistscreen' component={ProductListScreen} />
        <Stack.Screen name='productsScreen' component={ProductsScreen} />
        <Stack.Screen name='categoryScreen' component={CategoryScreen} />
    </Stack.Navigator>
  )
}

const CartStackNavigator = () => {
   return( <Stack.Navigator
    initialRouteName='cart-screen'
    screenOptions={{
        headerStyle:{
            backgroundColor:"#91c4f8"
        },
        headerShown:false
    }}
    >
        <Stack.Screen name='cart-screen' component={CartScreen} />
    </Stack.Navigator>
   )
}

const ProfileStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='profile-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='profile-screen' component={ProfileScreen} />
     </Stack.Navigator>
    )
 }
const OrderStackNavigator = () => {
    return( 
    <Stack.Navigator
     initialRouteName='order-screen'
     screenOptions={{
         headerStyle:{
             backgroundColor:"#91c4f8"
         },
         headerShown:false
     }}
     >
         <Stack.Screen name='order-screen' component={OrderScreen} />
     </Stack.Navigator>
    )
 }

export  {MainStackNavigator,CartStackNavigator,ProfileStackNavigator,OrderStackNavigator}
