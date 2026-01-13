import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConsumoItemForm from "./ConsumoItemForm";

export default function ItemRow({ item }) {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <>
            {!isEditing && (
                <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                >
                    <View style={styles.itemRow}>
                        <Text style={styles.itemQ}>
                            {`${item.quantity}x`}
                        </Text>
                        <Text style={styles.itemName}>
                            {item.item}
                        </Text>
                        <Text>{`$${Number(
                            item.price
                        ).toFixed(2)}`}</Text>
                        <Text style={styles.itemTotal}>
                            {`$${(
                                item.price * item.quantity
                            ).toFixed(2)}`}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            {isEditing && (
                <ConsumoItemForm
                    item={item}
                    handleAddConsumo={(nuevoConsumo) => {
                        setIsEditing(false);
                    }}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        gap: 5,
    },
    itemQ: {
        width: "10%",
        fontWeight: "bold",
        color: "blue",
        textAlign: "center",
    },
    itemName: {
        flex: 1,
    },
    itemTotal: {
        fontWeight: "bold",
        width: "25%",
        marginLeft: "10",
    },
});
