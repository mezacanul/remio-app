import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import InputUnderline from "../common/InputUnderline";

export default function InvitadosInput({
    handleInvitadosChange,
    cuenta,
}) {
    const [invitados, setInvitados] = useState("");

    useEffect(() => {
        setInvitados(
            cuenta.invitados == null ||
                cuenta.invitados === 0
                ? ""
                : cuenta.invitados.toString()
        );
    }, []);

    useEffect(() => {
        handleInvitadosChange(
            invitados == "" ? 0 : Number(invitados)
        );
    }, [invitados]);

    return (
        <View style={{ width: "40%", gap: 5 }}>
            <Text style={{ textAlign: "center" }}>
                {"Dividido entre:"}
            </Text>
            <InputUnderline
                value={invitados}
                style={{
                    width: "60%",
                    marginHorizontal: "auto",
                }}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="gray"
                onChangeText={setInvitados}
            />
            <Text
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                {"personas"}
            </Text>
        </View>
    );
}
