import { StyleSheet, Text, View } from "react-native";

const dividirTypeLabels = {
    enPartesIguales: "En partes iguales",
    porConsumo: "Por consumo",
};

export default function ConfigPreview({
    form,
    setForm,
    currentStep,
}) {
    return (
        <View style={styles.container}>
            {currentStep >= 1 && (
                <View style={styles.row}>
                    <Text>{"Título:"}</Text>
                    <Text style={styles.bigText}>
                        {form.titulo}
                    </Text>
                </View>
            )}

            {currentStep >= 2 && (
                <View style={styles.row}>
                    <Text>{"Dividir:"}</Text>
                    <Text style={styles.bigText}>
                        {dividirTypeLabels[form.dividirType]}
                    </Text>
                </View>
            )}

            {currentStep >= 3 && (
                <View style={styles.row}>
                    <Text>{"Total:"}</Text>
                    {canShowTotal(form) && (
                        <Text style={styles.bigText}>
                            {`$${form.total.toFixed(2)}`}
                        </Text>
                    )}

                    {typeof form.total === "object" && (
                        <Text style={styles.bigText}>
                            {"Por aportaciones"}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
}

function canShowTotal(form) {
    return (
        (form.dividirType === "enPartesIguales" &&
            typeof form.total === "number") ||
        form.dividirType === "porConsumo"
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        gap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bigText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
