import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { randomUUID } from "expo-crypto";
import { loadHook } from "lattice-design";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ConfigPreview from "../components/NuevaCuenta/ConfigPreview";
import DividirOptions from "../components/NuevaCuenta/DividirOptions";
import TituloInput from "../components/NuevaCuenta/TituloInput";
import TotalOptions from "../components/NuevaCuenta/TotalOptions";
import Button from "../components/common/Button";

export default function NuevaCuenta() {
    const navigation = useNavigation();
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [cuentas, setCuentas] = loadHook(
        "useCuentasList"
    );
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState({
        titulo: "",
        dividirType: null,
        total: null, // type: number || array
        invitados: null, // type: number || array
    });

    const handleNext = (step) => {
        setCurrentStep(step);
    };

    function handleCrearCuenta() {
        const cuentaListObject = createCuentaObject(form);
        console.log(cuentaListObject);

        setCuenta(cuentaListObject);
        setCuentas([...cuentas, cuentaListObject]);
        navigation.navigate("Calculator");
    }

    function createCuentaObject(form) {
        // console.log("dividirType: ", form.dividirType);

        const currentDate = format(
            new Date(),
            "dd 'de' MMMM",
            {
                locale: es,
            }
        );
        return {
            ...form,
            id: randomUUID(),
            fecha: currentDate,
            invitados:
                form.dividirType == "porConsumo"
                    ? []
                    : null,
        };
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row]}>
                {/* <Text>{currentStep}</Text>
                <Text>{typeof form.total}</Text> */}
                <Text style={styles.title}>
                    {"Nueva cuenta"}
                </Text>
                <CancelButton />
            </View>

            {currentStep >= 1 && (
                <ConfigPreview
                    form={form}
                    setForm={setForm}
                    currentStep={currentStep}
                />
            )}

            <View
                style={[
                    styles.stepsContainer,
                    {
                        justifyContent:
                            currentStep < 3
                                ? "center"
                                : "flex-start",
                        marginTop:
                            currentStep === 3 ? 30 : -80,
                    },
                ]}
            >
                {currentStep === 0 && (
                    <TituloInput
                        form={form}
                        setForm={setForm}
                        handleNext={handleNext}
                    />
                )}
                {currentStep === 1 && (
                    <DividirOptions
                        form={form}
                        setForm={setForm}
                        handleNext={handleNext}
                    />
                )}
                {currentStep === 2 && (
                    <TotalOptions
                        form={form}
                        setForm={setForm}
                        handleNext={handleNext}
                    />
                )}

                {currentStep === 3 &&
                    canCreateAccount(form) && (
                        <Button
                            title="Crear cuenta"
                            onPress={handleCrearCuenta}
                            style={
                                styles.createAccountButton
                            }
                        />
                    )}
            </View>
        </View>
    );
}

function canCreateAccount(form) {
    return (
        (typeof form.total === "number" &&
            form.total !== null) ||
        typeof form.total === "object"
    );
}

function CancelButton() {
    const navigation = useNavigation();

    function onCancel() {
        navigation.navigate("Home");
    }

    return (
        <TouchableOpacity onPress={onCancel}>
            <Ionicons
                name="close"
                size={20}
                color="gray"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    stepsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: 20,
    },
    createAccountButton: {
        width: "80%",
        alignSelf: "center",
    },
});
