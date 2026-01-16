import { loadHook } from "lattice-design";
import { Check } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { toCurrency } from "../../../utils/main";
import Button from "../../common/Button";
import CollapsableTrigger from "../../common/CollapsableTrigger";

export default function AportadorItem({
    aportador,
    index,
}) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(aportador.aportaciones);
    }, []);

    const total = useMemo(() => {
        return items.reduce(
            (acc, item) => acc + item.valor,
            0
        );
    }, [items]);

    function handleItemAdd(item) {
        const newItems = [...items, item];
        setItems(newItems);
        setCuenta({
            ...cuenta,
            total: cuenta.total.map((current) => {
                if (current.id === aportador.id) {
                    return {
                        ...current,
                        aportaciones: newItems,
                    };
                }
                return current;
            }),
        });
    }

    return (
        <View style={{ width: "100%" }}>
            <CollapsableTrigger
                isOpen={isOpen}
                onPress={() => {
                    setIsOpen(!isOpen);
                }}
                title={aportador.nombre}
                total={total}
            />
            {isOpen && (
                <ItemsContainerBox
                    items={items}
                    handleItemAdd={handleItemAdd}
                />
            )}
        </View>
    );
}

function ItemsContainerBox({ items, handleItemAdd }) {
    const [isAdding, setIsAdding] = useState(false);
    return (
        <View style={styles.container}>
            {!isAdding && (
                <Button
                    style={styles.addItemButton}
                    title="+ Añadir item"
                    fw="initial"
                    onPress={() => {
                        setIsAdding(!isAdding);
                    }}
                />
            )}

            {isAdding && (
                <ItemForm
                    onAddItem={(item) => {
                        handleItemAdd(item);
                        setIsAdding(false);
                    }}
                />
            )}

            {items.length === 0 && (
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                >
                    {"Aún no hay items agregados"}
                </Text>
            )}

            {items.length > 0 && (
                <ItemsList items={items} />
            )}
        </View>
    );
}

function ItemForm({ onAddItem }) {
    const [form, setForm] = useState({
        nombre: "",
        valor: 0,
    });

    return (
        <View style={styles.itemForm}>
            <TextInput
                style={[styles.inputBox, { flex: 1 }]}
                placeholder="Item"
                returnKeyType="done"
                value={form.nombre}
                onChangeText={(text) => {
                    setForm({ ...form, nombre: text });
                }}
            />
            <TextInput
                style={[
                    styles.inputBox,
                    { width: "20%", textAlign: "center" },
                ]}
                placeholder="Valor"
                value={form.valor}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(text) => {
                    setForm({
                        ...form,
                        valor: Number(text),
                    });
                }}
            />
            <Button
                style={styles.checkButton}
                title={
                    <Check
                        size={20}
                        color="white"
                    />
                }
                disabled={
                    form.nombre === "" || form.valor === 0
                }
                onPress={() => {
                    onAddItem(form);
                }}
            />
        </View>
    );
}

function ItemsList({ items }) {
    return (
        <View>
            <ItemsListHeader />

            <View style={styles.itemsListBody}>
                {items.map((item, index) => (
                    <ItemRow
                        key={index}
                        item={item}
                    />
                ))}
            </View>
        </View>
    );
}

function ItemRow({ item }) {
    return (
        <View style={styles.itemRow}>
            <Text>{item.nombre}</Text>
            <Text
                style={{
                    fontWeight: "bold",
                    color: "green",
                }}
            >
                {toCurrency(item.valor)}
            </Text>
        </View>
    );
}

function ItemsListHeader() {
    return (
        <View style={styles.itemsListHeader}>
            <Text style={styles.th}>Items</Text>
            <Text style={styles.th}>Valor</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    container: {
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    addItemButton: {
        width: "50%",
        marginHorizontal: "auto",
        paddingVertical: 8,
    },
    checkButton: {
        paddingVertical: 5,
        borderRadius: 8,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    itemForm: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    itemsListHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    th: {
        fontWeight: "bold",
    },
    itemsListBody: {
        gap: 10,
    },
});
