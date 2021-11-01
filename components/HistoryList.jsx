import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from "react";

import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import storage from "../components/LocalStorage";
import monthsNamesPt from "../data/monthsName";
import styles from '../styles/styles';

Date.prototype.getWeek = function (dowOffset) {

    dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0
    
    var newYear = new Date(this.getFullYear(),0,1)
    var day = newYear.getDay() - dowOffset //O dia da semana que o ano começa
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    
    // se o ano começa antes do meio da semana
    if(day < 4) {
        
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        
        if(weeknum > 52) {
            var nYear = new Date(this.getFullYear() + 1,0,1);
            var nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            // se o ano começa antes do meio da semana, é a semana 1 daquele ano
            weeknum = nday < 4 ? 1 : 53;
        }

    } else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    
    return weeknum;
};

export default function HistoryList({ navigation }) {
    
    const isFocused = useIsFocused()
    const [timeInterval, setTimeInterval] = useState(1)
    const [historyList, setHistoryList] = useState([])

    function filterIds(ids) {
        const now = new Date()

        switch (timeInterval) {
            case 1:
                return ids.filter(id => {
                    const date = new Date(id)
                    return date.getWeek() == now.getWeek()
                })
            case 2:
                return ids.filter(id => {
                    const date = new Date(id)
                    return date.getMonth() == now.getMonth()
                })
            case 3:
                return ids.filter(id => {
                    const date = new Date(id)
                    return date.getYear() == now.getYear()
                })
            case 4:
                return ids

            default:
                return []
        }
    }

    useEffect(() => {

        storage.getIdsForKey('foodHistory')
            .then(ids => filterIds(ids))
            .then(filteredIds => {
                storage.getBatchDataWithIds({
                    key: 'foodHistory',
                    ids: filteredIds
                })
                .then(ret => {
                    setHistoryList(ret)
                    console.log(ret)
                })
            })

        console.log("imprimindo historico")
    }, [timeInterval, isFocused])

    return (
        <>
            <View style={styles.container}>
                
                <View style={{width: 200, marginVertical: 15}}>
                    <Picker
                        selectedValue={timeInterval}
                        onValueChange={(itemValue, itemIndex) =>
                            setTimeInterval(itemValue)
                        }
                    >
                        <Picker.Item label='Última semana' value={1}/>
                        <Picker.Item label='Último mês' value={2}/>
                        <Picker.Item label='Último ano' value={3}/>
                        <Picker.Item label='Todo o histórico' value={4}/>
                    </Picker>
                </View>

                <ScrollView>
                    {
                        historyList.map(element => {

                            const [month, day, year] = element.day.split("/")

                            return (
                                <TouchableOpacity
                                    key={element.day}
                                    style={styles.menuItem}
                                    onPress={() => {
                                        navigation.navigate('HistoryInfoScreen', {dayHistory: element})
                                    }}
                                >
                                    <Text style={styles.buttonText}>{day} de {monthsNamesPt[month-1]} de 20{year}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                
			</View>
        </>
    )
}