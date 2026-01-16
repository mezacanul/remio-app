import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { loadHook } from "lattice-design";
import { X } from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { INITIAL_STATES } from "../../utils/constants/initialStates";
import { toCurrency } from "../../utils/main";
import AportacionesInfo from "../CalculatorLayout/AportacionesView/AportacionesInfo";

const dividirPorText = {
    partesIguales: "En partes iguales",
    cantidadDePersonas: "Por Persona",
};

export default function CalculatorLayout({ children }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.infoContainer}>
                <Titulo
                    cuenta={cuenta}
                    setCuenta={setCuenta}
                />
                {typeof cuenta.total == "number" && (
                    <TotalInfo />
                )}
                {typeof cuenta.total != "number" &&
                    cuenta.total != null && (
                        <AportacionesInfo />
                    )}
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                {children}
            </View>
        </View>
    );
}

function Titulo({ cuenta, setCuenta }) {
    const navigation = useNavigation();

    return (
        <View style={styles.tituloContainer}>
            <View>
                <View style={styles.tituloWrapper}>
                    <MaterialCommunityIcons
                        name="list-box-outline"
                        size={20}
                        color="blue"
                    />
                    <Text style={styles.tituloText}>
                        {cuenta.titulo}
                    </Text>
                </View>

                {/* Fecha */}
                <Text style={styles.fechaText}>
                    {cuenta.fecha}
                </Text>
            </View>

            {/* Close button */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home");
                    setCuenta(INITIAL_STATES.cuenta);
                }}
            >
                <X
                    size={22}
                    color="gray"
                />
            </TouchableOpacity>
        </View>
    );
}

function TotalInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    return (
        <View style={{ gap: 5 }}>
            <Text
                style={{
                    textAlign: "center",
                }}
            >
                {"Total de la cuenta"}
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "blue",
                }}
            >
                {toCurrency(cuenta.total)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tituloContainer: {
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: 5,
        width: "100%",
    },
    tituloWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        // margin: "auto",
        // alignSelf: "center",
    },
    tituloText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
    infoContainer: {
        gap: 7,
        marginTop: 15,
    },
    fechaText: {
        marginTop: 5,
        fontSize: 14,
        color: "gray",
    },
});
