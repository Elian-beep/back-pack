import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createNativeStackNavigator();

import Main from "./src/pages/Main";
import ListItems from "./src/pages/ListItems";

export default function Routes(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={Main} options={{ headerShown: false }} />
                <Tab.Screen name="ListItems" component={ListItems} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}