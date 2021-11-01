import React, { useState } from "react";

import { View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../styles/styles';
import FoodItem from "./FoodItem";

export default function FoodSearcher({ navigation, route }) {

	const [foodName, setFoodName] = useState('')
	const [foodsList, setFoodsList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const url = "https://taco-api-comabem.herokuapp.com/api/v1/food/name/"

	function searchFood() {

		if (foodName.length == 0)
			return

		setIsLoading(true)

		fetch(url + foodName)
			.then((resp) => {
				if (resp.status >= 200 && resp.status <= 299) {
					return resp.json()
				}
			})
			.then((foods) => {
				
				setFoodsList(foods)
				if (foods.length == 0) {
					ToastAndroid.show("Nenhum resultado encontrado", ToastAndroid.SHORT)
				}

				setIsLoading(false)
			})
	}

    return (
        <>
				<View style={styles.searchBar}>
					<TextInput
						style={{flex:6, backgroundColor:'white', paddingHorizontal:5}}
						placeholder="Insira o nome do alimento"
						value={foodName}
						onChangeText={value => setFoodName(value)}
					/>
					<TouchableOpacity style={{...styles.button, flex:1, marginVertical:0, height:45}} onPress={searchFood}>
						<Ionicons name="search" style={styles.buttonText}/>
					</TouchableOpacity>
				</View>

				<ScrollView>

				{
					isLoading ? <Text style={{textAlign: 'center'}}>Carregando...</Text>

					: foodsList.length !== 0 &&
						foodsList.map(element => {
							return <FoodItem 
								food={element} 
								key={element.id} 
								onPress={() => {

									if (route.params) {
										navigation.navigate('AddFoodScreen', {food: element})
										
									} else {
										navigation.navigate('FoodInfoScreen', {food: element})

									}
								}}
							></FoodItem>
						})
				}


				</ScrollView>
        </>
    )
}