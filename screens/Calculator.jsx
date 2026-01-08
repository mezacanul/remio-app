import { loadHook } from "lattice-design";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalculatorLayout from "../components/CalculatorLayout";

export default function Calculator({ navigation }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const result = useMemo(() => {
        if (cuenta.dividirPor == "partesIguales") {
            const total = Number(
                cuenta.total.replace("$", "")
            );
            const parsedResult = Number(
                (total / cuenta.personas).toFixed(2)
            );
            return parsedResult;
        }

        return null;
    }, [cuenta.dividirPor, cuenta.personas, cuenta.total]);

    return (
        <CalculatorLayout>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -200,
                    gap: 10,
                }}
            >
                <Text style={styles.infoText}>
                    {"Corresponde a"}
                </Text>
                <Text
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "green",
                    }}
                >{`$${result}`}</Text>
                <Text style={styles.infoText}>
                    {"Por persona"}
                </Text>
            </View>
        </CalculatorLayout>
    );
}

const styles = StyleSheet.create({
    infoText: {
        textAlign: "center",
        width: "40%",
        marginHorizontal: "auto",
    },
});
