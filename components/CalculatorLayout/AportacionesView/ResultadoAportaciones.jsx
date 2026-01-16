import { loadHook } from "lattice-design";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ResultadoItem from "./ResultadoItem";

export default function ResultadoAportaciones() {
    const [cuenta] = loadHook("useCuenta");
    const result = useMemo(() => {
        return cuenta.total.map((aportador) => {
            return {
                nombre: aportador.nombre,
                total:
                    aportador.aportaciones.reduce(
                        (acc, current) =>
                            acc + current.valor,
                        0
                    ) / cuenta.invitados,
            };
        });
    }, [cuenta.total, cuenta.invitados]);

    return (
        <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoTitle}>
                {"Corresponde a cada persona:"}
            </Text>

            {result.map((item, index) => (
                <ResultadoItem
                    key={index}
                    item={item}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    resultadoContainer: {
        width: "100%",
        marginVertical: 15,
        gap: 10,
    },
    resultadoTitle: {
        textAlign: "center",
        width: "60%",
        marginHorizontal: "auto",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingBottom: 5,
        // color: "blue",
    },
});
