import { loadHook } from "lattice-design";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import InvitadosInput from "../CuentaPartesIguales/InvitadosInput";
import AportacionForm from "./AportacionForm";
import AportadorItem from "./AportadorItem";

export default function AportacionesInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = (name) => {
        setIsAdding(false);
        setCuenta({
            ...cuenta,
            total: [
                ...cuenta.total,
                { nombre: name, aportaciones: [] },
            ],
        });
    };

    function handleInvitadosChange(text) {
        setCuenta({
            ...cuenta,
            invitados: Number(text),
        });
    }

    return (
        <View style={{ gap: 10, alignItems: "center" }}>
            <Text
                style={{
                    textAlign: "center",
                }}
            >
                {"Aportaciones"}
            </Text>

            {!isAdding && (
                <Button
                    title="+ Agregar"
                    style={{
                        width: "40%",
                        marginHorizontal: "auto",
                        paddingVertical: 8,
                    }}
                    fw={"initial"}
                    onPress={() => {
                        setIsAdding(true);
                    }}
                />
            )}

            {isAdding && (
                <AportacionForm onAdd={handleAdd} />
            )}

            <AportacionesList />

            <InvitadosInput
                handleInvitadosChange={
                    handleInvitadosChange
                }
                cuenta={cuenta}
            />

            <Resultado />
        </View>
    );
}

function AportacionesList() {
    const [cuenta] = loadHook("useCuenta");
    return (
        <View
            style={{
                width: "100%",
                marginVertical: 15,
                gap: 10,
            }}
        >
            {cuenta.total.map((aportador, index) => (
                <AportadorItem
                    key={index}
                    aportador={aportador}
                />
            ))}
        </View>
    );
}

function Resultado() {
    const [cuenta] = loadHook("useCuenta");
    const result = useMemo(() => {
        return cuenta.total.map((aportador) => {
            return {
                nombre: aportador.nombre,
                total: aportador.aportaciones.length,
            };
        });
    }, [cuenta.total, cuenta.invitados]);

    return (
        <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoTitle}>
                {"Correspondiente a cada persona:"}
            </Text>

            {result.map((item, index) => (
                <ResultadoItem
                    key={index}
                    item={item}
                />
            ))}
        </View>
    );
}

function ResultadoItem({ item }) {
    return (
        <View style={styles.resultadoItemContainer}>
            <Text style={styles.resultadoItemText}>
                {item.nombre}
            </Text>
            <Text style={styles.resultadoItemText}>
                {item.total}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultadoContainer: {
        width: "100%",
        marginVertical: 15,
        gap: 10,
    },
    resultadoTitle: {
        textAlign: "center",
        width: "60%",
        marginHorizontal: "auto",
        color: "blue",
    },
    resultadoItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    resultadoItemText: {
        fontWeight: "bold",
    },
    resultadoItemValue: {
        color: "green",
    },
});
