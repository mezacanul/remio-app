import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/common/Button";

export default function MenuPrincipal() {
    const [cuentas, setCuentas] = useState([]);

    function handleAddCuenta() {
        const currentDate = format(
            new Date(),
            "dd 'de' MMMM",
            {
                locale: es,
            }
        );
        setCuentas([
            ...cuentas,
            {
                id: cuentas.length + 1,
                name: "Cuenta " + (cuentas.length + 1),
                date: currentDate,
            },
        ]);
    }

    return (
        <View style={homeStyles.container}>
            <HomeHeader handleAddCuenta={handleAddCuenta} />
            <MisCuentasList cuentas={cuentas} />
        </View>
    );
}

function HomeHeader({ handleAddCuenta }) {
    return (
        <View style={homeStyles.header}>
            <Text style={homeStyles.title}>
                {"Mis cuentas"}
            </Text>
            <Button
                title="+"
                style={homeStyles.addButton}
                onPress={handleAddCuenta}
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
                        "Agrega tu primera cuenta para empezar 😄"
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
            <Text style={cuentasStyles.th}>{"Creado"}</Text>
        </View>
    );
}

function CuentaItem({ cuenta }) {
    return (
        <View style={cuentaItemStyles.container}>
            <View style={cuentaItemStyles.nameContainer}>
                <MaterialCommunityIcons
                    name="list-box-outline"
                    size={20}
                    color="black"
                />
                <Text style={{ fontSize: 15 }}>
                    {cuenta.name}
                </Text>
            </View>
            <Text>{cuenta.date}</Text>
        </View>
    );
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
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
