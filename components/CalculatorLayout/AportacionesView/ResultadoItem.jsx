import { StyleSheet, Text, View } from "react-native";

export default function ResultadoItem({ item }) {
    return (
        <View style={styles.resultadoItemContainer}>
            <Text style={styles.resultadoItemText}>
                {item.nombre}
            </Text>
            <Text style={styles.resultadoItemText}>
                {item.total}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultadoItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    resultadoItemText: {
        fontWeight: "bold",
    },
    resultadoItemValue: {
        color: "green",
    },
});
