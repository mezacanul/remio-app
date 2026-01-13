import { FontAwesome5 } from "@expo/vector-icons";
import { loadHook } from "lattice-design";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import InvitadoForm from "./InvitadoForm";
import InvitadoItem from "./InvitadoItem";

export default function CuentaPorConsumo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [invitados, setInvitados] = useState([]);
    const [isAdding, setIsAdding] = useState({
        invitado: false,
        consumo: false,
    });
    const totalInvitados = useMemo(() => {
        return invitados.reduce((acc, invitado) => {
            return (
                acc +
                Number(
                    invitado.items.reduce((acc, item) => {
                        return (
                            acc +
                            Number(item.price) *
                                Number(item.quantity)
                        );
                    }, 0)
                )
            );
        }, 0);
    }, [invitados]);

    const faltante = useMemo(() => {
        let totalCuenta;
        if (typeof cuenta.total != "number") {
            totalCuenta = Number(
                cuenta.total.replace("$", "")
            );
        } else {
            totalCuenta = cuenta.total;
        }
        return totalCuenta - Number(totalInvitados);
    }, [totalInvitados]);

    const handleAddInvitado = (nuevoInvitado) => {
        setInvitados([...invitados, nuevoInvitado]);
        setIsAdding({
            invitado: false,
            consumo: false,
        });
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    marginBottom: faltante != 0 ? 15 : 0,
                    gap: 5,
                }}
            >
                <View style={styles.totalInfoWrapper}>
                    {faltante == 0 && (
                        <FontAwesome5
                            name="check-circle"
                            size={20}
                            color="green"
                        />
                    )}
                    <Text
                        style={[
                            styles.totalInfoText,
                            {
                                color:
                                    faltante > 0 ||
                                    faltante < 0
                                        ? "black"
                                        : "green",
                            },
                        ]}
                    >
                        {faltante > 0
                            ? "Faltante"
                            : faltante < 0
                            ? "Sobrante"
                            : "Cuenta Balanceada"}
                    </Text>
                </View>
                {faltante != 0 && (
                    <Text
                        style={[
                            styles.totalInfoTextBold,
                            {
                                color:
                                    faltante > 0 ||
                                    faltante < 0
                                        ? "red"
                                        : "green",
                            },
                        ]}
                    >{`$${faltante}`}</Text>
                )}
            </View>

            {!isAdding.invitado && faltante != 0 && (
                <Button
                    title="+ Agregar invitado"
                    fw="initial"
                    style={styles.button}
                    onPress={() =>
                        setIsAdding({
                            invitado: true,
                            consumo: false,
                        })
                    }
                />
            )}
            {isAdding.invitado && (
                <InvitadoForm
                    handleAddInvitado={handleAddInvitado}
                />
            )}

            {invitados.length > 0 && (
                <View style={styles.invitadosContainer}>
                    {invitados.map((invitado) => (
                        <InvitadoItem
                            key={invitado.name}
                            invitado={invitado}
                            invitados={invitados}
                            setInvitados={setInvitados}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
        marginTop: 10,
    },
    totalInfoWrapper: {
        flexDirection: "column-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    totalInfoText: {
        textAlign: "center",
        fontSize: 16,
    },
    totalInfoTextBold: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        width: "50%",
        marginHorizontal: "auto",
    },
    invitadosContainer: {
        marginVertical: 30,
        gap: 10,
    },
});
