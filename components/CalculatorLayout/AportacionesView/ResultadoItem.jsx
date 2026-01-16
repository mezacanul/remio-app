import { StyleSheet, Text, View } from "react-native";
import { toCurrency } from "../../../utils/main";

export default function ResultadoItem({ item }) {
    return (
        <View style={styles.resultadoItemContainer}>
            <Text style={styles.resultadoName}>
                {item.nombre}
            </Text>
            <Text style={styles.resultadoTotal}>
                {toCurrency(item.total)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultadoItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginHorizontal: "auto",
    },
    resultadoName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    resultadoTotal: {
        fontSize: 16,
        color: "green",
        fontWeight: "bold",
    },
});
