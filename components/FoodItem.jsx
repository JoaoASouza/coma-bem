import React from "react";

import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import colorPallete from "../styles/colorPallete";

export default function FoodItem({ onPress, food }) {

    const foodTags = food.description.split(", ")

    return (
            <TouchableOpacity
                style={localStyle.container}
                onPress={() => onPress()}
            >
                <View style={{flexDirection: "row"}}>
                {

                    foodTags.map(tag => {
                        return <Text style={localStyle.title} key={foodTags.indexOf(tag)}>{tag}</Text>
                    })
                }
                </View>
                
                <Text style={localStyle.content}>
                    {Number(food.attributes.energy.kcal).toFixed(2)} kcal para cada {food.base_qty} {food.base_unit}
                </Text>
            </TouchableOpacity>
    )
}

const localStyle = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
    },

    content: {
        marginHorizontal: 10,
        marginBottom: 10,
        color: 'gray'
    },

    title: {
        margin: 5,
        fontWeight: 'bold',
        backgroundColor: colorPallete.highlightColor,
        borderRadius: 5,
        padding: 3,
    }

})