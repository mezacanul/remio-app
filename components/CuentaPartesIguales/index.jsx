import { loadHook } from "lattice-design";
import { useEffect } from "react";
import { View } from "react-native";
import { updateByObjectID } from "../../utils/main";
import AportacionesView from "../CalculatorLayout/AportacionesView";
import TotalFijoView from "../CalculatorLayout/TotalFijoView";

export default function CuentaPartesIguales() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [cuentas, setCuentas] = loadHook(
        "useCuentasList"
    );

    useEffect(() => {
        setCuentas(
            updateByObjectID(cuentas, cuenta.id, cuenta)
        );
    }, [cuenta]);

    function handleInvitadosChange(number) {
        setCuenta({
            ...cuenta,
            invitados: number,
        });
    }

    return (
        <View style={{ flex: 1 }}>
            {typeof cuenta.total == "number" && (
                <TotalFijoView
                    handleInvitadosChange={
                        handleInvitadosChange
                    }
                />
            )}
            {typeof cuenta.total != "number" &&
                cuenta.total != null && (
                    <AportacionesView
                        handleInvitadosChange={
                            handleInvitadosChange
                        }
                    />
                )}
        </View>
    );
}
