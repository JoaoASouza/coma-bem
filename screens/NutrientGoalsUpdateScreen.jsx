import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";

import { Text, TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet } from 'react-native'
import storage from "../components/LocalStorage";
import colorPallete from "../styles/colorPallete";
import styles from "../styles/styles";

export default function NutrientGoalsUpdateScreen() {

	const isFocused = useIsFocused()

	const [carbohydrateGoal, setCarbohydrateGoal] = useState("")
	const [proteinGoal, setProteinGoal] = useState("")
	const [lipidGoal, setLipidGoal] = useState("")
	const [cholesterolGoal, setCholesterolGoal] = useState("")
	const [sodiumGoal, setSodiumGoal] = useState("")

	useEffect(() => {
		storage
			.load({key: "userData"})
			.then(ret => {
				setCarbohydrateGoal(ret.goals.carbohydrateGoal.toString())
				setProteinGoal(ret.goals.proteinGoal.toString())
				setLipidGoal(ret.goals.lipidGoal.toString())
				setCholesterolGoal(ret.goals.cholesterolGoal.toString())
				setSodiumGoal(ret.goals.sodiumGoal.toString())
			})
			.catch(err => {
				console.log(err)
			})
	}, [isFocused])

	function handleSubmit() {

		if (carbohydrateGoal.length == 0) {
			ToastAndroid.show("Preencha com os carboidratos do alimento", ToastAndroid.SHORT)
			return
		}

		if (proteinGoal.length == 0) {
			ToastAndroid.show("Preencha com as proteinas do alimento", ToastAndroid.SHORT)
			return
		}

		if (lipidGoal.length == 0) {
			ToastAndroid.show("Preencha com os lipidios do alimento", ToastAndroid.SHORT)
			return
		}

		if (cholesterolGoal.length == 0) {
			ToastAndroid.show("Preencha com o colesterol do alimento", ToastAndroid.SHORT)
			return
		}

		if (sodiumGoal.length == 0) {
			ToastAndroid.show("Preencha com o sodio do alimento", ToastAndroid.SHORT)
			return
		}

		storage
			.load({key: "userData"})
			.then(ret => {
				const newGoals = {...ret.goals, 
					carbohydrateGoal,
					proteinGoal,
					lipidGoal,
					cholesterolGoal,
					sodiumGoal
				}

				const newUserData = {...ret, goals:newGoals}

				storage
					.save({key: "userData", data:newUserData})
					.then(() => ToastAndroid.show("Dados salvos com sucesso", ToastAndroid.SHORT))
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<View style={styles.container}>
			
			<View style={localStyle.formItem}>
				<Text style={localStyle.formTitle}>Carboidratos: (g)</Text>
				<TextInput
					style={localStyle.formField}
					placeholder="nova meta"
					keyboardType="numeric"
					value={carbohydrateGoal}
					onChangeText={value => setCarbohydrateGoal(value.replace(",", "."))}
				/>
			</View>

			<View style={localStyle.formItem}>
				<Text style={localStyle.formTitle}>Proteínas: (g)</Text>
				<TextInput
					style={localStyle.formField}
					placeholder="nova meta"
					keyboardType="numeric"
					value={proteinGoal}
					onChangeText={value => setProteinGoal(value.replace(",", "."))}
				/>
			</View>

			<View style={localStyle.formItem}>
				<Text style={localStyle.formTitle}>Lipídios: (g)</Text>
				<TextInput
					style={localStyle.formField}
					placeholder="nova meta"
					keyboardType="numeric"
					value={lipidGoal}
					onChangeText={value => setLipidGoal(value.replace(",", "."))}
				/>
			</View>

			<View style={localStyle.formItem}>
				<Text style={localStyle.formTitle}>Colesterol: (mg)</Text>
				<TextInput
					style={localStyle.formField}
					placeholder="nova meta"
					keyboardType="numeric"
					value={cholesterolGoal}
					onChangeText={value => setCholesterolGoal(value.replace(",", "."))}
				/>
			</View>

			<View style={localStyle.formItem}>
				<Text style={localStyle.formTitle}>Sódio: (mg)</Text>
				<TextInput
					style={localStyle.formField}
					placeholder="nova meta"
					keyboardType="numeric"
					value={sodiumGoal}
					onChangeText={value => setSodiumGoal(value.replace(",", "."))}
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={handleSubmit}
			>
				<Text style={styles.buttonText}>Salvar</Text>
			</TouchableOpacity>

		</View>
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