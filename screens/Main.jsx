import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/core';

import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import colorPallete from '../styles/colorPallete';
import storage from '../components/LocalStorage';

const Tab = createBottomTabNavigator()

function MainNavigator() {
	return (

		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = 'home'

					} else if (route.name === 'Pesquisa') {
						iconName = 'search'

					} else if (route.name === 'Perfil') {
						iconName = 'person'

					} else if (route.name === 'Histórico') {
						iconName = 'trending-up'

					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: colorPallete.secondaryColor,
				tabBarInactiveTintColor: colorPallete.inactiveColor,
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{headerShown:false}}
			/>

			<Tab.Screen
				name="Pesquisa"
				component={SearchScreen}
				options={{headerShown:false}}
			/>

			<Tab.Screen
				name="Perfil"
				component={ProfileScreen}
				options={{headerShown:false}}
			/>

			<Tab.Screen
				name="Histórico"
				component={HistoryScreen}
				options={{headerShown:false}}
			/>

		</Tab.Navigator>
	)
}

export default function Main({ navigation }) {

	const isFocused = useIsFocused()
	const [userData, setUserData] = useState(-1)

	useEffect(() => {
		storage
			.load({
				key: 'userData'
			})
			.then(ret => {
				setUserData(ret.user.tmb)
			})
			.catch(err => {
				setUserData(0)
			})
	}, [isFocused])

	if (userData == -1) {
		return null

	} else if (userData == 0)  {
		return <WelcomeScreen navigation={navigation}/>
	}

	return <MainNavigator/>

}