import { loadHook } from "lattice-design";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../common/Button";
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
