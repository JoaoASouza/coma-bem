import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ProgressScreen from './ProgressScreen'
import AddFoodScreen from './AddFoodScreen'
import FoodSearcher from '../components/FoodSearcher'

const HomeStack = createNativeStackNavigator()

export default function HomeScreen() {
	return (
		<>
			<HomeStack.Navigator>
				<HomeStack.Screen
					name="ProgressScreen"
					component={ProgressScreen}
					options={{headerShown:false}}
				/>
				<HomeStack.Screen
					name="AddFoodScreen"
					component={AddFoodScreen}
					options={{title: "Adicionar Alimento"}}
				/>
				<HomeStack.Screen
					name="FoodSearcher"
					component={FoodSearcher}
					options={{title: "Procurar alimento"}}
				/>
			</HomeStack.Navigator>
		</>
	)
}