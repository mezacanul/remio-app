import { StyleSheet, Text, View } from "react-native";
import { toCurrency } from "../../../utils/main";

export default function ResultadoFijo({ result }) {
    return (
        <View style={styles.resultContainer}>
            <Text style={styles.infoText}>
                {"Corresponde a"}
            </Text>
            <Text style={styles.resultText}>
                {toCurrency(result)}
            </Text>
            <Text
                style={[
                    styles.infoText,
                    { fontWeight: "bold" },
                ]}
            >
                {"por persona"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
        gap: 10,
        // alignItems: "center",
        marginTop: -180,
    },
    resultText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "green",
    },
    infoText: {
        textAlign: "center",
        width: "40%",
        marginHorizontal: "auto",
    },
});
