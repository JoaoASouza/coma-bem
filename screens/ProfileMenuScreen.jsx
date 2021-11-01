import React from "react";

import { TouchableOpacity, Text, View, Alert } from 'react-native'
import storage from "../components/LocalStorage";
import styles from "../styles/styles";

export default function ProfileMenuScreen({ navigation }) {
    storage

    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('ShortUserFormScreenUpdate')}
            >
                <Text style={styles.buttonText}>Alterar TMB</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('UserFormScreenUpdate')}
            >
                <Text style={styles.buttonText}>Recalcular TMB</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('NutrientGoalsUpdateScreen')}
            >
                <Text style={styles.buttonText}>Alterar metas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    Alert.alert(
                        "Apagar histórico?",
                        "Ao prossegir todo o seu histórico de alimentação será apagado",
                        [
                            {
                                text: "Cancelar",
                                style: "cancel"
                            },
                            {
                                text: "Apagar",
                                onPress: () => storage.clearMapForKey('foodHistory')
                            }
                        ]
                    )
                }}
            >
                <Text style={styles.buttonText}>Apagar Histórico</Text>
            </TouchableOpacity>
        </View>
    )
}