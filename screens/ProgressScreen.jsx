import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import * as Progress from 'react-native-progress'
import storage from '../components/LocalStorage';
import colorPallete from '../styles/colorPallete';

import styles from '../styles/styles';

export default function ProgressScreen({ navigation }) {

	const isFocused = useIsFocused()

	useEffect(() => {
		storage
			.load({
				key: 'userData'
			})
			.then(ret => {
				setEnergyGoal(ret.goals.energyGoal)
				setCarbohydrateGoal(ret.goals.carbohydrateGoal)
				setProteinGoal(ret.goals.proteinGoal)
				setLipidGoal(ret.goals.lipidGoal)
				setCholesterolGoal(ret.goals.cholesterolGoal)
				setSodiumGoal(ret.goals.sodiumGoal)
			})
			.catch(err => {
				//setEnergyGoal(1)
			})

		const now = new Date()
		const dateId = now.toDateString()

		storage
			.load({
				key: 'foodHistory',
				id: dateId
			})
			.then(ret => {

				var totalEnergy = 0
				var totalCarbohydrate = 0
				var totalProtein = 0
				var totalLipid = 0
				var totalCholesterol = 0
				var totalSodium = 0

				ret.meals.forEach((meal) => {

					totalEnergy += meal.energy * meal.baseQty/100
					totalCarbohydrate += meal.carbohydrate * meal.baseQty/100
					totalProtein += meal.protein * meal.baseQty/100
					totalLipid += meal.lipid * meal.baseQty/100
					totalCholesterol += meal.cholesterol * meal.baseQty/100
					totalSodium += meal.sodium * meal.baseQty/100
					
				})

				setEnergy(Math.round(totalEnergy))
				setCarbohydrate(Math.round(totalCarbohydrate))
				setProtein(Math.round(totalProtein))
				setLipid(Math.round(totalLipid))
				setCholesterol(Math.round(totalCholesterol))
				setSodium(Math.round(totalSodium))

			})
			.catch(err => {
				setEnergy(0)
				setCarbohydrate(0)
				setProtein(0)
				setLipid(0)
				setCholesterol(0)
				setSodium(0)
			})

	}, [isFocused])

	const [energy, setEnergy] = useState(0)
	const [carbohydrate, setCarbohydrate] = useState(0)
	const [protein, setProtein] = useState(0)
	const [lipid, setLipid] = useState(0)
	const [cholesterol, setCholesterol] = useState(0)
	const [sodium, setSodium] = useState(0)

	const [energyGoal, setEnergyGoal] = useState(1)
	const [carbohydrateGoal, setCarbohydrateGoal] = useState(1)
	const [proteinGoal, setProteinGoal] = useState(1)
	const [lipidGoal, setLipidGoal] = useState(1)
	const [cholesterolGoal, setCholesterolGoal] = useState(1)
	const [sodiumGoal, setSodiumGoal] = useState(1)

	return (
		<>
			<View style={styles.container}>
				
				<Text style={styles.mainTitle}>Seu progresso hoje</Text>

				<Progress.Circle
					progress={energy/energyGoal}
					size={200} showsText={true}
					formatText={() => `${energy} kcal`}
					color={energy/energyGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>
				<Text style={{color: 'gray', marginBottom:10}}>Sua meta é de {energyGoal} kcal</Text>
				
				<View style={styles.row}>
					<Text style={styles.rowTitle}>Carboidratos</Text>
					<Text style={styles.rowContent}>{carbohydrate}/{carbohydrateGoal} g</Text>
				</View>
				<Progress.Bar
					width={250}
					progress={carbohydrate/carbohydrateGoal}
					color={carbohydrate/carbohydrateGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>
				
				<View style={styles.row}>
					<Text style={styles.rowTitle}>Proteínas</Text>
					<Text style={styles.rowContent}>{protein}/{proteinGoal} g</Text>
				</View>
				<Progress.Bar
					width={250}
					progress={protein/proteinGoal}
					color={protein/proteinGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>
				
				<View style={styles.row}>
					<Text style={styles.rowTitle}>Lipídios</Text>
					<Text style={styles.rowContent}>{lipid}/{lipidGoal} g</Text>
				</View>
				<Progress.Bar
					width={250}
					progress={lipid/lipidGoal}
					color={lipid/lipidGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>

				<View style={styles.row}>
					<Text style={styles.rowTitle}>Colesterol</Text>
					<Text style={styles.rowContent}>{cholesterol}/{cholesterolGoal} mg</Text>
				</View>
				<Progress.Bar
					width={250}
					progress={cholesterol/cholesterolGoal}
					color={cholesterol/cholesterolGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>

				<View style={styles.row}>
					<Text style={styles.rowTitle}>Sódio</Text>
					<Text style={styles.rowContent}>{sodium}/{sodiumGoal} mg</Text>
				</View>
				<Progress.Bar
					width={250}
					progress={sodium/sodiumGoal}
					color={sodium/sodiumGoal >= 1 ? colorPallete.secondaryColor : colorPallete.primaryColor}
				/>
				
				<TouchableOpacity
					style={{...styles.button, width:150, marginTop:30}}
					onPress={() => {
						navigation.navigate('AddFoodScreen', {food : {}})
					}}
				>
					<Text style={styles.buttonText}>Adicionar Alimento</Text>
				</TouchableOpacity>

			</View>
		</>
	)
}