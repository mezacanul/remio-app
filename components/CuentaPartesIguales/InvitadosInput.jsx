import { Text, View } from "react-native";
import InputUnderline from "../common/InputUnderline";

export default function InvitadosInput({
    handleInvitadosChange,
    cuenta,
}) {
    return (
        <View style={{ width: "40%", gap: 5 }}>
            <Text style={{ textAlign: "center" }}>
                {"Dividido entre:"}
            </Text>
            <InputUnderline
                value={cuenta.invitados}
                style={{
                    width: "60%",
                    marginHorizontal: "auto",
                }}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="gray"
                onChangeText={handleInvitadosChange}
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
