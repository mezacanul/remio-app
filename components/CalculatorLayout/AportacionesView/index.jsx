import { loadHook } from "lattice-design";
import { useMemo } from "react";
import { View } from "react-native";
import InvitadosInput from "../../CuentaPartesIguales/InvitadosInput";
import ResultadoAportaciones from "./ResultadoAportaciones";

export default function AportacionesView({
    handleInvitadosChange,
}) {
    const [cuenta] = loadHook("useCuenta");
    const totalCheck = useMemo(() => {
        // console.log(JSON.stringify(cuenta.total));
        let total = 0;
        cuenta.total.forEach((aportador) => {
            aportador.aportaciones.forEach((aportacion) => {
                total += aportacion.valor;
            });
        });
        console.log(total);
        return total;
    }, [cuenta.total]);
    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                gap: 20,
            }}
        >
            {totalCheck > 0 && (
                <InvitadosInput
                    handleInvitadosChange={
                        handleInvitadosChange
                    }
                    cuenta={cuenta}
                />
            )}

            {cuenta.invitados > 0 && (
                <ResultadoAportaciones />
            )}
        </View>
    );
}
