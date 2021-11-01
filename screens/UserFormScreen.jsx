import React, { useState } from 'react'

import { View, Text, TextInput, Button } from 'react-native'
import RadioButtonRN from 'radio-buttons-react-native';
import { Picker } from '@react-native-picker/picker';

import styles from '../styles/styles';
import colorPallete from '../styles/colorPallete';
import storage from '../components/LocalStorage';
import RDI from '../data/referenceDailyIntake';

const genders = [
	{
		label: 'Masculino',
		value: 'M'
	},
	{
		label: 'Feminino',
		value: 'F'
	}
];

export default function UserFormScreen({ navigation }) {


	function calculateTMB(sex, weight, height, age, exFreq) {
		if (sex === 'F') {
			return (665 + 9.6*weight + 1.8*height - 4.7*age) * exFreq
		} else {
			return (66 + 13.8*weight + 5*height - 6.8*age) * exFreq
		}
	}

	function handleSubmit() {

		if (sex.length == 0) {
			setAlert('Selecione o sexo')
			return
		}

		if (weight.length == 0) {
			setAlert('Insira seu peso')
			return
		}

		if (height.length == 0) {
			setAlert('Insira sua altura')
			return
		}

		if (age.length == 0) {
			setAlert('Insira sua idade')
			return
		}

		if (exFreq.length == 0) {
			setAlert('Selecione a freqência de exercícios')
			return
		}

		const tmb = calculateTMB(sex, parseFloat(weight), parseInt(height), parseInt(age), parseFloat(exFreq))

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

	const [sex, setSex] = useState('')
	const [weight, setWeight] = useState('')
	const [height, setHeight] = useState('')
	const [age, setAge] = useState('')
	const [exFreq, setExFreq] = useState('1')

	const [alert, setAlert] = useState('')

    return (
        <View style={styles.container} >

			<View style={styles.form}>
				
				<View style={styles.formItem}>
					<Text>Sexo:</Text>
					<RadioButtonRN
						activeColor={colorPallete.primaryColor}
						style={styles.radio}
						box={false}
						data={genders}
						selectedBtn={(e) => setSex(e.value)}
					/>
				</View>

				<View style={styles.formItem}>
					<Text>Peso:</Text>
					<TextInput
						placeholder="Insira seu peso em kg"
						keyboardType='numeric'
						value={weight}
						onChangeText={value => setWeight(value.replace(',', '.'))}
					/>
				</View>

				<View style={styles.formItem}>
					<Text>Altura:</Text>
					<TextInput
						placeholder="Insira sua altura em cm"
						keyboardType='numeric'
						value={height}
						onChangeText={value => setHeight(value.replace(',', '.'))}
					/>
				</View>

				<View style={styles.formItem}>
					<Text>Idade:</Text>
					<TextInput
						placeholder="Insira sua idade em anos"
						keyboardType='numeric'
						value={age}
						onChangeText={value => setAge(value.replace(',', '.'))}
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
						<Picker.Item label='Muito intenso (2x dia ou muito intenso)' value='2'/>
					</Picker>
				</View>

				<Button
					title="Continuar"
					color={colorPallete.primaryColor}
					onPress={() => {
						handleSubmit()
					}}
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