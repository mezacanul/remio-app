import { loadHook } from "lattice-design";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import InvitadosInput from "../../CuentaPartesIguales/InvitadosInput";
import ResultadoFijo from "./ResultadoFijo";

export default function TotalFijoView({
    handleInvitadosChange,
}) {
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
                    <ResultadoFijo result={result} />
                </View>
            )}
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
});
