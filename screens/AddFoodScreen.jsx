import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";

import { View, Text, TextInput, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native'
import styles from '../styles/styles';

import colorPallete from "../styles/colorPallete";
import storage from "../components/LocalStorage";

export default function AddFoodScreen({ navigation, route }) {

	function handleSubmit() {
		
		if (foodName.length == 0) {
			ToastAndroid.show("Preencha o nome do alimento", ToastAndroid.SHORT)
			return
		}
		if (baseQty.length == 0) {
			ToastAndroid.show("Preencha a quantidade do alimento", ToastAndroid.SHORT)
			return
		}
		if (energy.length == 0) {
			ToastAndroid.show("Preencha com as calorias do alimento", ToastAndroid.SHORT)
			return
		}
		if (carbohydrate.length == 0) {
			ToastAndroid.show("Preencha com os carboidratos do alimento", ToastAndroid.SHORT)
			return
		}
		if (protein.length == 0) {
			ToastAndroid.show("Preencha com as proteinas do alimento", ToastAndroid.SHORT)
			return
		}
		if (lipid.length == 0) {
			ToastAndroid.show("Preencha com os lipidios do alimento", ToastAndroid.SHORT)
			return
		}
		if (cholesterol.length == 0) {
			ToastAndroid.show("Preencha com o colesterol do alimento", ToastAndroid.SHORT)
			return
		}
		if (sodium.length == 0) {
			ToastAndroid.show("Preencha com o sodio do alimento", ToastAndroid.SHORT)
			return
		}

		const now = new Date()
		const dateId = now.toDateString()
		const meal = {
			foodName,
			baseQty: Number(baseQty),
			energy: Number(energy),
			carbohydrate: Number(carbohydrate),
			protein: Number(protein),
			lipid: Number(lipid),
			cholesterol: Number(cholesterol),
			sodium: Number(sodium)
		}

		storage
			.load({
				key: 'foodHistory',
				id: dateId,
			})
			
			.then(ret => {

				ret.meals.push(meal)

				storage
					.save({
						key: 'foodHistory',
						id: dateId,
						data: ret
					})
					.then(() => {
						ToastAndroid.show("Alimento salvo!", ToastAndroid.SHORT)
					})
					
			})

			.catch(err => {
				switch (err.name) {
					case 'NotFoundError':

						var newData = {
							day: now.toLocaleDateString(),
							meals: [meal]
						}
						storage
							.save({
								key: 'foodHistory',
								id: dateId,
								data: newData
							})
							.then(() => {
								ToastAndroid.show("Alimento Salvo!", ToastAndroid.SHORT)
							})

						break;
				}
			})

		
	}

	function sanitizeInput(nutrient) {
		if (nutrient == undefined)
			return "0"

		if (nutrient.kcal != undefined) {
			if (nutrient.kcal == "NA")
				return "0"
			return nutrient.kcal.toFixed(2).toString()
		}
		
		if (nutrient.qty == "NA" || isNaN(Number(nutrient.qty)))
			return "0"


		return nutrient.qty.toFixed(2).toString()
	}

	const { food } = route.params

	const isFocused = useIsFocused()

	const [baseQty, setBaseQty] = useState('')
	const [foodName, setFoodName] = useState('')
	const [energy, setEnergy] = useState('')
	const [carbohydrate, setCarbohydrate] = useState('')
	const [protein, setProtein] = useState('')
	const [lipid, setLipid] = useState('')
	const [cholesterol, setCholesterol] = useState('')
	const [sodium, setSodium] = useState('')

	useEffect(() => {
		
		if (Object.entries(food).length == 0)
			return

		setFoodName(food.description)
		setEnergy(sanitizeInput(food.attributes.energy))
		setCarbohydrate(sanitizeInput(food.attributes.carbohydrate))
		setProtein(sanitizeInput(food.attributes.protein))
		setLipid(sanitizeInput(food.attributes.lipid))
		setCholesterol(sanitizeInput(food.attributes.cholesterol))
		setSodium(sanitizeInput(food.attributes.sodium))
		setBaseQty(food.base_qty.toString())

	}, [isFocused])

	return (
		<>
			<View style={styles.container}>


				<TouchableOpacity
					style={{...styles.button, width:150, marginTop:30}}
					onPress={() => {
						navigation.navigate('FoodSearcher', { 
							screen: 'AddFoodScreen',
							params: { hasToReturFood: true }
						})
					}}
				>
					<Text style={styles.buttonText}>Procurar alimento</Text>
				</TouchableOpacity>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Nome do alimento:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="Insira o nome"
						value={foodName}
						onChangeText={(value) => setFoodName(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Quantidade:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em gramas"
						keyboardType='numeric'
						value={baseQty}
						onChangeText={(value) => setBaseQty(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Calorias:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em kcal"
						keyboardType='numeric'
						value={energy}
						onChangeText={(value) => setEnergy(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Carboidratos:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em gramas"
						keyboardType='numeric'
						value={carbohydrate}
						onChangeText={(value) => setCarbohydrate(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Proteinas:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em gramas"
						keyboardType='numeric'
						value={protein}
						onChangeText={(value) => setProtein(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Lipidios:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em gramas"
						keyboardType='numeric'
						value={lipid}
						onChangeText={(value) => setLipid(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Colesterol:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em miligramas"
						keyboardType='numeric'
						value={cholesterol}
						onChangeText={(value) => setCholesterol(value)}
					/>
				</View>

				<View style={localStyle.formItem}>
					<Text style={localStyle.formTitle}>Sodio:</Text>
					<TextInput
						style={localStyle.formField}
						placeholder="valor em miligramas"
						keyboardType='numeric'
						value={sodium}
						onChangeText={(value) => setSodium(value)}
					/>
				</View>

				<TouchableOpacity
					style={{...styles.button, width:150, marginTop:20}}
					onPress={handleSubmit}
				>
					<Text style={styles.buttonText}>Adicionar</Text>
				</TouchableOpacity>

			</View>
		</>
	)
}

const localStyle = StyleSheet.create({

	formItem: {
		flexDirection: 'row',
		width: 300,
		backgroundColor: colorPallete.highlightColor,
		marginTop: 5,
		padding: 5,
		borderRadius: 5
	},

	formTitle: {
		textAlign: 'left',
		flex: 1
	},

	formField: {
		textAlign: 'center',
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 5,

	}

})