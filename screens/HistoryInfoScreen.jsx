import React from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import monthsNamesPt from "../data/monthsName";
import colorPallete from "../styles/colorPallete";

export default function HistoryInfoScreen({ route }) {
    
    const history = route.params.dayHistory

    const [month, day, year] = history.day.split("/")
    
    var foods = []
    var totalEnergy = 0
    var totalCarbohydrate = 0
    var totalProtein = 0
    var totalLipid = 0
    var totalCholesterol = 0
    var totalSodium = 0

    history.meals.forEach(meal => {
        
        const returnedIndex = foods.findIndex(element => element.name == meal.foodName)
        if (returnedIndex != -1) {
            foods[returnedIndex].qty += meal.baseQty
        } else {
            foods.push({name: meal.foodName, qty: meal.baseQty})
        }
        
        totalEnergy += meal.energy * meal.baseQty/100
        totalCarbohydrate += meal.carbohydrate * meal.baseQty/100
        totalProtein += meal.protein * meal.baseQty/100
        totalLipid += meal.lipid * meal.baseQty/100
        totalCholesterol += meal.cholesterol * meal.baseQty/100
        totalSodium += meal.sodium * meal.baseQty/100
        
    })

    function renderItem({item}) {
        return <Text>{item.name} - {item.qty}</Text>
    }

    return (
        <ScrollView style={localStyle.table}>
            
            <View style={localStyle.tableTitle}>
                <Text style={localStyle.tableTitleText}>{day} de {monthsNamesPt[month-1]} de 20{year}</Text>
            </View>

            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Calorias:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalEnergy)} g</Text>
            </View>

            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Carboidratos:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalCarbohydrate)} g</Text>
            </View>
            
            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Proteínas:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalProtein)} g</Text>
            </View>

            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Lipídios:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalLipid)} g</Text>
            </View>

            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Colesterol:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalCholesterol)} mg</Text>
            </View>

            <View style={localStyle.tableRow}>
                <Text style={localStyle.rowTitle}>Total de Sodio:</Text>
                <Text style={localStyle.rowContent}>{Math.round(totalSodium)} mg</Text>
            </View>


            <View backgroundColor='white' marginVertical={10} paddingVertical={5}>
                <Text style={{fontSize: 20, textAlign: "center"}}>Alimentos consumidos</Text>
                {
                    foods.map(element => {
                        return <Text
                                style={{textAlign: "center"}}
                                key={element.name}
                            >
                                {element.name.split(', ').join(' ')} - {element.qty}g
                            </Text>
                    })
                }
            </View>

        </ScrollView>
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