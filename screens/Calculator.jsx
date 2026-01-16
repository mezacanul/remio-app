import { loadHook } from "lattice-design";
import { Share, UserRoundPlus } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import Button from "../components/common/Button";
import CalculatorLayout from "../components/common/CalculatorLayout";
import CuentaPartesIguales from "../components/CuentaPartesIguales";
import CuentaPorConsumo from "../components/CuentaPorConsumo";

export default function Calculator() {
    const [cuenta, setCuenta] = loadHook("useCuenta");

    return (
        <CalculatorLayout>
            {cuenta.dividirType == "enPartesIguales" && (
                <CuentaPartesIguales />
            )}
            {cuenta.dividirType == "porConsumo" && (
                <CuentaPorConsumo />
            )}
            <Footer />
        </CalculatorLayout>
    );
}

function Footer() {
    return (
        <View style={styles.footer}>
            <Button
                fs={14}
                title={"Enviar Invitación"}
                icon={
                    <UserRoundPlus
                        size={20}
                        color="white"
                    />
                }
                fw={"initial"}
                style={{ flex: 1 }}
                // bgColor="green"
            />
            <Button
                fs={14}
                title={"Compartir Cuenta"}
                fw={"initial"}
                style={{ flex: 1 }}
                icon={
                    <Share
                        size={20}
                        color="white"
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        gap: 5,
        width: "100%",
        marginHorizontal: "auto",
        // paddingVertical: 40,
        paddingTop: 20,
        paddingBottom: 30,
    },
});
