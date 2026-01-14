import { loadHook } from "lattice-design";
import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputUnderline from "../common/InputUnderline";

export default function CuentaPartesIguales() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const result = useMemo(() => {
        if (
            cuenta.invitados == 0 ||
            cuenta.invitados == null
        ) {
            return null;
        }
        return cuenta.total / cuenta.invitados;
    }, [cuenta.total, cuenta.invitados]);

    useEffect(() => {
        setCuenta({
            ...cuenta,
            invitados: 0,
        });
    }, []);

    function handleInvitadosChange(text) {
        setCuenta({
            ...cuenta,
            invitados: Number(text),
        });
    }

    return (
        <View style={styles.container}>
            <InvitadosInput
                cuenta={cuenta}
                handleInvitadosChange={
                    handleInvitadosChange
                }
            />
            {result && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Resultado result={result} />
                </View>
            )}
        </View>
    );
}

function InvitadosInput({ handleInvitadosChange, cuenta }) {
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
            <Text style={{ textAlign: "center" }}>
                {"personas"}
            </Text>
        </View>
    );
}

function Resultado({ result }) {
    return (
        <View style={styles.resultContainer}>
            <Text style={styles.infoText}>
                {"Corresponde a"}
            </Text>
            <Text
                style={styles.resultText}
            >{`$${result}`}</Text>
            <Text style={styles.infoText}>
                {"Por persona"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        paddingTop: 15,
        alignItems: "center",
        gap: 20,
    },
    resultContainer: {
        gap: 10,
        alignItems: "center",
        marginTop: -180,
    },
    resultText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "green",
    },
    infoText: {
        textAlign: "center",
        width: "40%",
        marginHorizontal: "auto",
    },
});
