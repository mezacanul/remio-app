import { loadHook } from "lattice-design";
import { useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import CalculatorLayout from "../components/CalculatorLayout";
import InputUnderline from "../components/InputUnderline";

export default function PreOptions({ navigation }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [personas, setPersonas] = useState(0);

    return (
        <CalculatorLayout>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                    marginTop: -150,
                }}
            >
                {cuenta.dividirPor === null &&
                    cuenta.dividirPor !=
                        "partesIguales" && (
                        <Opciones navigation={navigation} />
                    )}
                {cuenta.dividirPor === "partesIguales" && (
                    <PersonasInput
                        personas={personas}
                        setPersonas={setPersonas}
                        navigation={navigation}
                    />
                )}
                <BackButton
                    callback={() => {
                        setCuenta({
                            ...cuenta,
                            dividirPor: null,
                            personas: null,
                        });
                    }}
                />
            </View>
        </CalculatorLayout>
    );
}

function PersonasInput({
    personas,
    setPersonas,
    navigation,
}) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 16,
                }}
            >
                {"¿Cuantas personas van a pagar?"}
            </Text>
            <InputUnderline
                value={personas}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) => {
                    console.log(text);
                    setPersonas(Number(text));
                }}
            />
            <Button
                disabled={personas === 0}
                style={{
                    width: "50%",
                }}
                title="Siguiente"
                onPress={() => {
                    setCuenta({
                        ...cuenta,
                        personas: Number(personas),
                    });
                    navigation.navigate("Calculator");
                }}
            />
        </>
    );
}
function Opciones({ navigation }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    width: "60%",
                    marginHorizontal: "auto",
                }}
            >
                {"¿Como te gustaría dividir la cuenta?"}
            </Text>
            <View
                style={{
                    gap: 10,
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Button
                    title="En Partes Iguales"
                    fw="initial"
                    style={{
                        width: "50%",
                    }}
                    onPress={() => {
                        setCuenta({
                            ...cuenta,
                            dividirPor: "partesIguales",
                        });
                        // navigation.navigate("Calculator");
                    }}
                />
                <Button
                    title="Por persona"
                    fw="initial"
                    style={{
                        width: "50%",
                    }}
                    onPress={() => {
                        setCuenta({
                            ...cuenta,
                            dividirPor: "persona",
                        });
                        navigation.navigate("Calculator");
                    }}
                />
            </View>
        </>
    );
}
