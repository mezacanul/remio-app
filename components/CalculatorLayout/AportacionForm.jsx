import { Check } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../common/Button";

export default function AportacionForm({ onAdd }) {
    const [name, setName] = useState("");
    return (
        <View
            style={{
                width: "80%",
                marginHorizontal: "auto",
                flexDirection: "row",
                gap: 10,
            }}
        >
            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Button
                title={
                    <Check
                        size={20}
                        color="white"
                    />
                }
                style={styles.button}
                onPress={() => {
                    onAdd(name);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
    },
    button: {
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        // paddingVertical: 8,
        paddingHorizontal: 10,
    },
});
