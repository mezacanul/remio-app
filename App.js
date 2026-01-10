import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Nexus, Singleton } from "lattice-design";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "./components/common/Layout";
import Calculator from "./screens/Calculator";
import Onboarding from "./screens/Onboarding";
import PreOptions from "./screens/PreOptions";

const Stack = createNativeStackNavigator();

Nexus({
    useCuenta: Singleton({
        total: "",
        dividirPor: null,
        personas: null,
    }),
});

export default function App() {
    return (
        <>
            <StatusBar
                style="dark"
                backgroundColor="#fff"
                animated={true}
                // edgeToEdgeEnabled={true}
                translucent={true}
            />
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    <Layout>
                        <Stack.Navigator
                            initialRouteName="Onboarding"
                            screenOptions={{
                                headerShown: false,
                                animation: "none",
                            }}
                        >
                            <Stack.Screen
                                name="Onboarding"
                                component={Onboarding}
                            />
                            <Stack.Screen
                                name="PreOptions"
                                component={PreOptions}
                            />
                            <Stack.Screen
                                name="Calculator"
                                component={Calculator}
                            />
                        </Stack.Navigator>
                    </Layout>
                </SafeAreaView>
            </NavigationContainer>
        </>
    );
}
