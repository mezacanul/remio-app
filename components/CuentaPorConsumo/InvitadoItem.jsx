import {
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ConsumoList from "./ConsumoList";

export default function InvitadoItem({
    invitado,
    invitados,
    setInvitados,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const total = useMemo(() => {
        return invitado.items.reduce((acc, item) => {
            return (
                acc +
                Number(item.price) * Number(item.quantity)
            );
        }, 0);
    }, [invitado.items]);

    const handleAddConsumo = (nuevoConsumo) => {
        const updatedInvitados = invitados.map((i) => {
            if (i.name === invitado.name) {
                return {
                    ...i,
                    items: [...i.items, nuevoConsumo],
                };
            }
            return i;
        });
        setInvitados(updatedInvitados);
    };

    return (
        <View>
            <Pressable
                onPress={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <View style={styles.invitadoPressable}>
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                    <Text style={styles.invitadoName}>
                        {invitado.name}
                    </Text>
                    <Text
                        style={[
                            styles.invitadoTotal,
                            {
                                fontWeight:
                                    total > 0
                                        ? "bold"
                                        : "normal",
                                color:
                                    total > 0
                                        ? "blue"
                                        : "gray",
                                marginRight:
                                    total > 0 ? 10 : 25,
                            },
                        ]}
                    >
                        {total > 0
                            ? `$${Number(total).toFixed(2)}`
                            : "$ --"}
                    </Text>
                </View>
            </Pressable>
            {isOpen && (
                <ConsumoList
                    items={invitado.items}
                    handleAddConsumo={handleAddConsumo}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    invitadoPressable: {
        flexDirection: "row",
        gap: 5,
        width: "100%",
        alignItems: "center",
    },
    invitadoName: {
        flex: 1,
        fontSize: 18,
    },
    invitadoTotal: {
        fontSize: 16,
    },
});
