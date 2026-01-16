import { randomUUID } from "expo-crypto";
import { loadHook } from "lattice-design";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../../common/Button";
import AportacionesList from "./AportacionesList";
import AportacionForm from "./AportacionForm";

export default function AportacionesInfo() {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = (name) => {
        setIsAdding(false);
        setCuenta({
            ...cuenta,
            total: [
                ...cuenta.total,
                {
                    id: randomUUID(),
                    nombre: name,
                    aportaciones: [],
                },
            ],
        });
    };

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
