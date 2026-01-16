import { loadHook } from "lattice-design";
import { View } from "react-native";
import AportadorItem from "./AportadorItem";

export default function AportacionesList() {
    const [cuenta] = loadHook("useCuenta");
    return (
        <View
            style={{
                width: "100%",
                marginVertical: 15,
                gap: 10,
            }}
        >
            {cuenta.total.map((aportador) => (
                <AportadorItem
                    key={aportador.id}
                    aportador={aportador}
                />
            ))}
        </View>
    );
}
