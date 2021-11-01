import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import NutrientGoalsUpdateScreen from "./NutrientGoalsUpdateScreen";
import ProfileMenuScreen from "./ProfileMenuScreen";
import ShortUserFormScreen from "./ShortUserFormScreen";
import UserFormScreen from "./UserFormScreen";

const ProfileStack = createNativeStackNavigator()

export default function ProfileScreen() {
    return (
        <>
            <ProfileStack.Navigator>
                <ProfileStack.Screen
                    name="ProfileMenuScreen"
                    component={ProfileMenuScreen}
                    options={{title: "Dados pessoais"}}
                />
                <ProfileStack.Screen
                    name="ShortUserFormScreenUpdate"
                    component={ShortUserFormScreen}
                    options={{title: "Alterar TMB"}}
                />
                <ProfileStack.Screen
                    name="UserFormScreenUpdate"
                    component={UserFormScreen}
                    options={{title: "Recalcular TMB"}}
                />
                <ProfileStack.Screen
                    name="NutrientGoalsUpdateScreen"
                    component={NutrientGoalsUpdateScreen}
                    options={{title: "Alterar metas"}}
                />
            </ProfileStack.Navigator>
                
        </>
    )
}