import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../common/Button";
import { styles as mainStyles } from "./style";

const defaultInvitado = {
    name: "",
    total: 0,
    items: [],
};

export default function InvitadoForm({
    handleAddInvitado,
}) {
    const [invitadoForm, setInvitadoForm] =
        useState(defaultInvitado);
    return (
        <View style={styles.invitadoForm}>
            <TextInput
                style={[mainStyles.inputBox, { flex: 2 }]}
                placeholder="Nombre"
                placeholderTextColor="gray"
                value={invitadoForm.name}
                onChangeText={(text) =>
                    setInvitadoForm({
                        ...invitadoForm,
                        name: text,
                    })
                }
            />
            <Button
                disabled={invitadoForm.name === ""}
                title="Agregar"
                onPress={() => {
                    handleAddInvitado(invitadoForm);
                    setInvitadoForm(defaultInvitado);
                }}
                fw="initial"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    invitadoForm: {
        flexDirection: "row",
        gap: 5,
        width: "100%",
    },
});
