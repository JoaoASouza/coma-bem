import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HistoryList from "../components/HistoryList";
import HistoryInfoScreen from "./HistoryInfoScreen";

const HistoryStack = createNativeStackNavigator()


export default function HistoryScreen() {
    
    return (

        <HistoryStack.Navigator>
            <HistoryStack.Screen
                name="HistoryList"
                component={HistoryList}
                options={{title: "Histórico de Alimentação"}}
            />
            <HistoryStack.Screen
                name="HistoryInfoScreen"
                component={HistoryInfoScreen}
                options={{title: "Histórico do dia"}}
            />

        </HistoryStack.Navigator>

    )
}