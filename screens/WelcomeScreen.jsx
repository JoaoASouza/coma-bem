import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import styles from '../styles/styles';

export default function WelcomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.mainTitle}>Seja bem vindo!</Text>
			<Text style={styles.paragraph}>ComaBem é um aplicativo para auxílio de controle alimentar. Para otimzar sua experiência precisamos saber sua Taxa de Metabolismo Basal</Text>
			
			<TouchableOpacity
				style={{...styles.button, width:150}}
				onPress={() => {
					navigation.navigate('UserFormScreen')
				}}
			>
				<Text style={styles.buttonText}>Calcular TMB</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={{...styles.button, width:150}}
				onPress={() => {
					navigation.navigate('ShortUserFormScreen')
				}}
			>
				<Text style={styles.buttonText}>Já sei minha TMB</Text>
			</TouchableOpacity>
			
		</View>
	)
}