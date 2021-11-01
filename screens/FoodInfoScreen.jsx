import React, { useState } from "react";

import { View, Text, TextInput, StyleSheet } from 'react-native'
import colorPallete from "../styles/colorPallete";

export default function FoodInfoScreen({ route }) {

	const foodItem = route.params.food

	const [baseQty, setBaseQty] = useState('100')

	function calculateNutrientQty(nutrient) {
		if (nutrient == undefined)
			return "NA"

		if (nutrient.kcal != undefined) {
			if (nutrient.kcal == "NA")
				return "NA"
			return Number(nutrient.kcal * baseQty/foodItem.base_qty).toFixed(2) + " kcal"
		}

		if (nutrient.qty == "NA" || isNaN(Number(nutrient.qty)))
			return "NA"

		const nutrientQty = nutrient.qty * baseQty/foodItem.base_qty
		return Number(nutrientQty).toFixed(2) + " " + nutrient.unit
	}

	return (
		<>
			<View style={localStyle.tableTitle}>
				<Text style={localStyle.tableTitleText}>{foodItem.description}</Text>

				<View style={{flexDirection: 'row'}}>
					<Text style={{color:'white'}}>Quantidade em gramas: </Text>
					<TextInput
						style={{backgroundColor: 'white', width: 50, borderRadius: 5, textAlign: 'center'}}
						keyboardType='numeric'
						value={baseQty}
						onChangeText={value => setBaseQty(value)}
					/>
				</View>
			</View>

			<View style={localStyle.table}>

				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Calorias:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.energy)}</Text>
				</View>

				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Carboidratos:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.carbohydrate)}</Text>
				</View>
				
				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Proteínas:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.protein)}</Text>
				</View>

				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Lipídios:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.lipid)}</Text>
				</View>

				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Colesterol:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.cholesterol)}</Text>
				</View>

				<View style={localStyle.tableRow}>
					<Text style={localStyle.rowTitle}>Sodio:</Text>
					<Text style={localStyle.rowContent}>{calculateNutrientQty(foodItem.attributes.sodium)}</Text>
				</View>

			</View>
		</>
	)
}

const localStyle = StyleSheet.create({

	table: {
		flex: 1,
	},

	tableRow: {
		flexDirection: 'row',
		marginHorizontal: 10,
		backgroundColor: 'white',
		marginTop: 10,
		padding: 10
	},

	tableTitle: {
		backgroundColor: colorPallete.secondaryColor,
		alignItems: 'center',
		paddingVertical: 10,
	},

	tableTitleText: {
		color:'white',
		fontSize: 25,
		margin:10
	},

	rowTitle: {
		textAlign: 'left',
		flex: 1
	},

	rowContent: {
		textAlign: 'right',
		flex: 1
	}

})