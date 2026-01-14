import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { loadHook } from "lattice-design";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AdsBanner from "../components/AdsBanner";
import Button from "../components/common/Button";

export default function MenuPrincipal() {
    const [cuentas, setCuentas] = loadHook(
        "useCuentasList"
    );

    return (
        <View style={styles.container}>
            <View style={homeStyles.container}>
                <HomeHeader />
                <MisCuentasList cuentas={cuentas} />
            </View>
            <AdsBanner />
        </View>
    );
}

function HomeHeader() {
    const navigation = useNavigation();
    return (
        <View style={homeStyles.header}>
            <Text style={homeStyles.title}>
                {"Mis cuentas"}
            </Text>
            <Button
                title="+"
                style={homeStyles.addButton}
                // onPress={handleAddCuenta}
                // onPress={() => setIsAdding(true)}
                onPress={() =>
                    navigation.navigate("NuevaCuenta")
                }
            />
        </View>
    );
}

function MisCuentasList({ cuentas }) {
    return (
        <View style={cuentasStyles.container}>
            {cuentas.length === 0 && (
                <Text style={cuentasStyles.emptyListText}>
                    {
                        "Agrega tu primera cuenta para empezar 🥂"
                    }
                </Text>
            )}

            {cuentas.length > 0 && <TableHeader />}
            {cuentas.length > 0 && (
                <FlatList
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={
                        cuentasStyles.listContainer
                    }
                    data={cuentas}
                    renderItem={({ item }) => (
                        <CuentaItem cuenta={item} />
                    )}
                />
            )}
        </View>
    );
}

function TableHeader() {
    return (
        <View style={cuentasStyles.tableHeaderContainer}>
            <Text style={cuentasStyles.th}>{"Nombre"}</Text>
            <Text style={cuentasStyles.th}>{"Fecha"}</Text>
        </View>
    );
}

function CuentaItem({ cuenta }) {
    const navigation = useNavigation();
    const [_, setCuenta] = loadHook("useCuenta");

    function handleNavigateToCalculator() {
        navigation.navigate("Calculator");
        setCuenta(cuenta);
    }
    return (
        <TouchableOpacity
            onPress={handleNavigateToCalculator}
        >
            <View style={cuentaItemStyles.container}>
                <View
                    style={cuentaItemStyles.nameContainer}
                >
                    <MaterialCommunityIcons
                        name="list-box-outline"
                        size={20}
                        color="black"
                    />
                    <Text style={{ fontSize: 15 }}>
                        {cuenta.titulo}
                    </Text>
                </View>
                <Text>{cuenta.fecha}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: "2%",
    },
});

const homeStyles = StyleSheet.create({
    container: {
        position: "relative",
        // flex: 1,
        height: "65%",
        borderWidth: 2,
        // borderColor: "dodgerblue",
        borderColor: "royalblue",
        marginTop: 10,
        borderRadius: 10,
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        gap: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        // color: "blue",
    },
    addButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});

const cuentasStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    },
    tableHeaderContainer: {
        marginTop: 20,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        paddingBottom: 8,
    },
    th: {
        fontWeight: "bold",
    },
    listContainer: {
        width: "100%",
        gap: 10,
    },
    emptyListText: {
        fontSize: 16,
        textAlign: "center",
        width: "70%",
        marginHorizontal: "auto",
        marginTop: -60,
    },
});

const cuentaItemStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});
