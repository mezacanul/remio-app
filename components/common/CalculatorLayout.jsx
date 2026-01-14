import { MaterialCommunityIcons } from "@expo/vector-icons";
import { loadHook } from "lattice-design";
import { StyleSheet, Text, View } from "react-native";

const dividirPorText = {
    partesIguales: "En partes iguales",
    cantidadDePersonas: "Por Persona",
};

export default function CalculatorLayout({ children }) {
    const [cuenta] = loadHook("useCuenta");

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.infoContainer}>
                <View style={styles.tituloContainer}>
                    <MaterialCommunityIcons
                        name="list-box-outline"
                        size={20}
                        color="blue"
                    />
                    <Text style={styles.tituloText}>
                        {cuenta.titulo}
                    </Text>
                </View>
                <TotalInfo />
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tituloContainer: {
        borderBottomWidth: 1,
        paddingBottom: 3,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    tituloText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
    infoContainer: {
        gap: 7,
        marginTop: 15,
    },
});

function TotalInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <View>
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
        </View>
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
