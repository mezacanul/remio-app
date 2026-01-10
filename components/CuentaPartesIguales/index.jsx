import { StyleSheet, Text, View } from "react-native";

export default function CuentaPartesIguales({ result }) {
    return (
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
    );
}

const styles = StyleSheet.create({
    infoText: {
        textAlign: "center",
        width: "40%",
        marginHorizontal: "auto",
    },
});
