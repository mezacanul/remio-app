import { loadHook } from "lattice-design";
import { View } from "react-native";
import InvitadosInput from "../../CuentaPartesIguales/InvitadosInput";
import ResultadoAportaciones from "./ResultadoAportaciones";

export default function AportacionesView({
    handleInvitadosChange,
}) {
    const [cuenta] = loadHook("useCuenta");
    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                gap: 20,
            }}
        >
            <InvitadosInput
                handleInvitadosChange={
                    handleInvitadosChange
                }
                cuenta={cuenta}
            />

            {cuenta.invitados > 0 && (
                <ResultadoAportaciones />
            )}
        </View>
    );
}
