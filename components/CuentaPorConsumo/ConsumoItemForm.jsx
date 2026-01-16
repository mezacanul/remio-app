import { Check } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../common/Button";
import { styles as mainStyles } from "./style";

const defaultConsumo = {
    item: "",
    price: 0,
    quantity: 0,
};

export default function ConsumoItemForm({
    item = null,
    handleAddConsumo,
}) {
    const [consumoForm, setConsumoForm] = useState(
        item ? item : defaultConsumo
    );

    return (
        <View style={styles.consumoItemForm}>
            <TextInput
                style={[
                    mainStyles.inputBox,
                    { flex: 4, paddingVertical: 5 },
                ]}
                placeholder="Nombre del item"
                placeholderTextColor="gray"
                value={consumoForm.item}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        item: text,
                    })
                }
            />
            <TextInput
                style={[
                    mainStyles.inputBox,
                    { flex: 1, textAlign: "center" },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                placeholder="Q"
                placeholderTextColor="gray"
                value={consumoForm.quantity}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        quantity: text,
                    })
                }
            />
            <TextInput
                style={[
                    mainStyles.inputBox,
                    { flex: 1.5, textAlign: "center" },
                ]}
                placeholder="Precio"
                keyboardType="numeric"
                returnKeyType="done"
                placeholderTextColor="gray"
                value={consumoForm.price}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        price: text,
                    })
                }
            />
            <Button
                title={
                    <Check
                        // <ArrowRight
                        size={20}
                        color="white"
                    />
                }
                style={{
                    paddingVertical: 5,
                }}
                onPress={() => {
                    handleAddConsumo(consumoForm);
                }}
                disabled={
                    !consumoForm.quantity ||
                    !consumoForm.item ||
                    !consumoForm.price
                }
                fw="initial"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    consumoItemForm: {
        gap: 5,
        flexDirection: "row",
    },
});
