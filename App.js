import React from 'react';

import Main from './screens/Main';
import UserFormScreen from './screens/UserFormScreen';
import ShortUserFormScreen from './screens/ShortUserFormScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

export default function App() {

	return (

		<NavigationContainer>
	
			<Stack.Navigator>
				<Stack.Screen
					name="Main"
					component={Main}
					options={{headerShown:false}}
				/>

				<Stack.Screen
					name="UserFormScreen"
					options={{title: "Insira seus dados"}}
					component={UserFormScreen}
				/>

				<Stack.Screen
					name="ShortUserFormScreen"
					options={{title: "Insira seus dados"}}
					component={ShortUserFormScreen}
				/>
			</Stack.Navigator>

		</NavigationContainer>

	);
}
