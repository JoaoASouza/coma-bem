import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import FoodSearcher from "../components/FoodSearcher";
import FoodInfoScreen from "./FoodInfoScreen";

const SearchStack = createNativeStackNavigator()

export default function SearchScreen() {

	return (
		<SearchStack.Navigator>
			<SearchStack.Screen
				name="FoodSearcher"
				component={FoodSearcher}
				options={{headerShown:false}}
			/>
			<SearchStack.Screen
				name="FoodInfoScreen"
				component={FoodInfoScreen}
				options={{title: "Informação nutricional"}}
			/>
		</SearchStack.Navigator>
	)
	
}