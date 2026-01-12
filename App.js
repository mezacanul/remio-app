import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { loadHook, Nexus, Singleton } from "lattice-design";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Layout from "./components/common/Layout";
import Calculator from "./screens/Calculator";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NuevaCuenta from "./screens/NuevaCuenta";
import Onboarding from "./screens/Onboarding";
import PreOptions from "./screens/PreOptions";

const Stack = createNativeStackNavigator();

Nexus({
    useCuenta: Singleton({
        titulo: null,
        dividirType: null,
        total: null, // type: number || array
        invitados: null, // type: number || array
    }),
    useUser: Singleton({
        email: null,
        token: null,
    }),
});

export default function App() {
    const [user, setUser] = loadHook("useUser");

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar
                style="dark"
                backgroundColor="transparent"
                animated={true}
                translucent={true}
            />
            <NavigationContainer>
                <Layout>
                    <Stack.Navigator
                        initialRouteName={
                            user.email ? "Home" : "Login"
                        }
                        screenOptions={{
                            headerShown: false,
                            animation: "none",
                        }}
                        backgroundColor="transparent"
                    >
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            name="Home"
                            component={Home}
                        />
                        <Stack.Screen
                            name="NuevaCuenta"
                            component={NuevaCuenta}
                        />
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
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
