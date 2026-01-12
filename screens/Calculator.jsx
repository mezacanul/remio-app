import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { loadHook } from "lattice-design";
import { useMemo } from "react";
import { View } from "react-native";
import Button from "../components/common/Button";
import CalculatorLayout from "../components/common/CalculatorLayout";
import CuentaPartesIguales from "../components/CuentaPartesIguales";
import CuentaPorConsumo from "../components/CuentaPorConsumo";

export default function Calculator() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const result = useMemo(() => {
        if (cuenta.dividirType == "partesIguales") {
            let total;
            if (typeof cuenta.total != "number") {
                total = Number(
                    cuenta.total.replace("$", "")
                );
            } else {
                total = cuenta.total;
            }
            const parsedResult = Number(
                (total / cuenta.invitados).toFixed(2)
            );
            return parsedResult;
        }

        return null;
    }, [
        cuenta.dividirType,
        cuenta.invitados,
        cuenta.total,
    ]);

    return (
        <CalculatorLayout>
            {cuenta.dividirType == "enPartesIguales" && (
                <CuentaPartesIguales result={result} />
            )}
            {cuenta.dividirType == "porConsumo" && (
                <CuentaPorConsumo />
            )}
            <View
                style={{
                    flexDirection: "row",
                    gap: 5,
                    width: "85%",
                    marginHorizontal: "auto",
                    marginBottom: 20,
                }}
            >
                <Button
                    fs={14}
                    title={"Compartir Cuenta"}
                    icon={
                        <FontAwesome5
                            // name="share-social-outline"
                            name="whatsapp"
                            size={20}
                            color="white"
                            style={{ marginBottom: 2 }}
                        />
                    }
                    fw={"initial"}
                    style={{ flex: 1 }}
                    // bgColor="green"
                />
                <Button
                    fs={14}
                    title={"Enviar Invitación"}
                    fw={"initial"}
                    style={{ flex: 1 }}
                    icon={
                        <Ionicons
                            name="send-outline"
                            size={20}
                            color="white"
                        />
                    }
                    // bgColor="green"
                />
            </View>
        </CalculatorLayout>
    );
}
