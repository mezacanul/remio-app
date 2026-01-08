import { useNavigation } from "@react-navigation/native";
import { loadHook } from "lattice-design";
import { Text, TouchableOpacity, View } from "react-native";

const dividirPorText = {
    partesIguales: "En partes iguales",
    cantidadDePersonas: "Por Persona",
};

export default function CalculatorLayout({ children }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const navigation = useNavigation();

    const handleReset = () => {
        setCuenta({
            total: "",
            dividirPor: null,
            personas: null,
        });
        navigation.navigate("Onboarding");
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 7, marginVertical: 20 }}>
                <TotalInfo />
                {cuenta.dividirPor && <DividirPorInfo />}
                {cuenta.dividirPor == "partesIguales" &&
                    cuenta.personas > 0 && <PersonasInfo />}
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                {children}
            </View>
            <TouchableOpacity
                onPress={handleReset}
                style={{ marginBottom: 30 }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        textDecorationLine: "underline",
                        fontSize: 16,
                    }}
                >
                    {"Volver a empezar"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function TotalInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <>
            <Text
                style={{
                    textAlign: "center",
                }}
            >
                {"Total de la cuenta"}
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "bold",
                }}
            >
                {cuenta.total}
            </Text>
        </>
    );
}

function DividirPorInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <>
            <>
                <Text style={{ textAlign: "center" }}>
                    {"Dividido"}
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    {dividirPorText[cuenta.dividirPor]}
                </Text>
            </>
        </>
    );
}

function PersonasInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <>
            <Text style={{ textAlign: "center" }}>
                {"Entre"}
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                {`${cuenta.personas} personas`}
            </Text>
        </>
    );
}
