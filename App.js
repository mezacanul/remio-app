import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Calculator from "./screens/Calculator";
import Onboarding from "./screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                style="dark"
                backgroundColor="#fff"
                animated={true}
                edgeToEdgeEnabled={true}
                translucent={true}
            />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Onboarding"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                    />
                    <Stack.Screen
                        name="Calculator"
                        component={Calculator}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
