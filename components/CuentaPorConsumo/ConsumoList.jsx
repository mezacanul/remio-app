import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import ConsumoItemForm from "./ConsumoItemForm";
import ItemsList from "./ItemsList";

export default function ConsumoList({
    items,
    handleAddConsumo,
}) {
    const [isAddingConsumo, setIsAddingConsumo] =
        useState(false);

    return (
        <View style={[styles.consumoForm]}>
            <Text style={styles.consumoFormTitle}>
                {"Agrega tus items de consumo aquí"}
            </Text>

            {!isAddingConsumo && (
                <Button
                    title="+"
                    fw="initial"
                    onPress={() => {
                        setIsAddingConsumo(true);
                    }}
                    style={styles.addConsumoButton}
                />
            )}
            {isAddingConsumo && (
                <ConsumoItemForm
                    handleAddConsumo={(nuevoConsumo) => {
                        handleAddConsumo(nuevoConsumo);
                        setIsAddingConsumo(false);
                    }}
                />
            )}

            {items.length > 0 && (
                <ItemsList items={items} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    consumoFormTitle: {
        textAlign: "center",
        marginBottom: 10,
    },
    consumoForm: {
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    addConsumoButton: {
        width: "20%",
        marginHorizontal: "auto",
        paddingVertical: 5,
    },
});
