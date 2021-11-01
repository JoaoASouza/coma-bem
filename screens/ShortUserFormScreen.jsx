import React, { useState } from 'react'

import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import styles from '../styles/styles'
import colorPallete from '../styles/colorPallete'
import storage from '../components/LocalStorage'
import RDI from '../data/referenceDailyIntake'

export default function ShortUserFormScreen({ navigation }) {

	const [alert, setAlert] = useState('')
	const [tmb, setTmb] = useState('')
	const [exFreq, setExFreq] = useState('1')

	function handleSubmit() {
		if (tmb.length == 0) {
			setAlert('Insira a taxa para prosseguir')
			return
		}

		const user = {
			tmb: tmb,
			exFreq: exFreq,
		}

		storage.save({
			key:'userData',
			data: {
				user,
				goals: {
					energyGoal: Math.round(tmb*exFreq),
					carbohydrateGoal: Math.round(RDI.carbohydrate * (tmb*exFreq)/RDI.baseKcal),
					proteinGoal: Math.round(RDI.protein * (tmb*exFreq)/RDI.baseKcal),
					lipidGoal: Math.round(RDI.lipid * (tmb*exFreq)/RDI.baseKcal),
					cholesterolGoal: Math.round(RDI.cholesterol * (tmb*exFreq)/RDI.baseKcal),
					sodiumGoal: Math.round(RDI.sodium * (tmb*exFreq)/RDI.baseKcal),
				}
			}
		})

		navigation.goBack()
	}

	return (
		<View style={styles.container}>

			<View style={styles.form}>

				<View style={styles.formItem}>
					<Text>Taxa de Metabolismo Basal:</Text>
					<TextInput
						placeholder="Insira sua TMB em kcal"
						keyboardType='numeric'
						value={tmb}
						onChangeText={value => setTmb(value.replace(',', '.'))}
					/>
				</View>

				<View style={styles.formItem}>
					<Text>Frequência de exercícios:</Text>
					<Picker
						selectedValue={exFreq}
						onValueChange={(itemValue, itemIndex) =>
							setExFreq(itemValue)
						}
					>
						<Picker.Item label='Nenhum' value='1'/>
						<Picker.Item label='Pouco (1-3 dias/semana)' value='1.375'/>
						<Picker.Item label='Moderado (3-5 dias/semana)' value='1.55'/>
						<Picker.Item label='Intenso (5-7 dias/semana)' value='1.725'/>
						<Picker.Item label='Muito intenso (2x dia ou muito pesado)' value='2'/>
					</Picker>
				</View>

				<Button
					title="Continuar"
					color={colorPallete.primaryColor}
					onPress={handleSubmit}
				/>

				<Text
					style={styles.alert}
				>
					{alert}
				</Text>

			</View>

		</View>
	)
}