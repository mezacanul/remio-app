import { FontAwesome5 } from "@expo/vector-icons";
import { loadHook } from "lattice-design";
import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../common/Button";

const defaultInvitado = {
    name: "",
    total: 0,
    items: [],
};

const defaultConsumo = {
    item: "",
    price: 0,
    quantity: 0,
};

export default function CuentaPorPersona() {
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
        const totalCuenta = Number(
            cuenta.total.replace("$", "")
        );
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
        <View
            style={{
                flex: 1,
                gap: 5,
                marginTop: 10,
                paddingHorizontal: 20,
            }}
        >
            {/* {faltante == 0 && (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircleCheck
                        size={20}
                        color="green"
                    />
                </View>
            )} */}

            <View
                style={{
                    marginBottom: faltante != 0 ? 15 : 0,
                    gap: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: "column-reverse",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    {faltante == 0 && (
                        <FontAwesome5
                            name="check-circle"
                            size={20}
                            color="green"
                        />
                    )}
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 16,
                            color:
                                faltante > 0 || faltante < 0
                                    ? "black"
                                    : "green",
                        }}
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
                        style={{
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: "bold",
                            color:
                                faltante > 0 || faltante < 0
                                    ? "red"
                                    : "green",
                        }}
                    >{`$${faltante}`}</Text>
                )}
            </View>

            {!isAdding.invitado && faltante != 0 && (
                <Button
                    title="+ Agregar invitado"
                    fw="initial"
                    style={{
                        width: "50%",
                        marginHorizontal: "auto",
                    }}
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
                <View
                    style={{ marginVertical: 30, gap: 10 }}
                >
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

function InvitadoItem({
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
                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 18,
                        }}
                    >
                        {invitado.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight:
                                total > 0
                                    ? "bold"
                                    : "normal",
                            color:
                                total > 0 ? "blue" : "gray",
                            marginRight:
                                total > 0 ? 10 : 25,
                        }}
                    >
                        {total > 0
                            ? `$${Number(total).toFixed(2)}`
                            : "--"}
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

function ConsumoList({ items, handleAddConsumo }) {
    const [isAddingConsumo, setIsAddingConsumo] =
        useState(false);

    return (
        <View style={[styles.consumoForm]}>
            <Text
                style={{
                    textAlign: "center",
                    marginBottom: 10,
                }}
            >
                {"Agrega tus items de consumo aquí"}
            </Text>

            {!isAddingConsumo && (
                <Button
                    title="+"
                    fw="initial"
                    onPress={() => {
                        setIsAddingConsumo(true);
                    }}
                    style={{
                        width: "20%",
                        marginHorizontal: "auto",
                        paddingVertical: 5,
                    }}
                />
            )}
            {isAddingConsumo && (
                <ConsumoItemForm
                    handleAddConsumo={(nuevoConsumo) => {
                        handleAddConsumo(nuevoConsumo);
                        setIsAddingConsumo(false);
                    }}
                />
            )}

            {items.length > 0 && (
                <ItemsList items={items} />
            )}
        </View>
    );
}

function ItemsList({ items }) {
    return (
        <View
            style={{
                gap: 10,
                marginTop: 20,
                marginBottom: 5,
            }}
        >
            <ItemsListHeader />
            {items.map((item) => (
                <ItemRow
                    key={item.item}
                    item={item}
                />
            ))}
        </View>
    );
}

function ItemsListHeader() {
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "lightgray",
                paddingBottom: 5,
            }}
        >
            <Text
                style={{
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                {"#"}
            </Text>
            <Text style={{ flex: 1, fontWeight: "bold" }}>
                Item
            </Text>
            <Text style={{ fontWeight: "bold" }}>
                Precio
            </Text>
            <Text
                style={{
                    width: "25%",
                    marginLeft: "10",
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                Total
            </Text>
        </View>
    );
}

function ItemRow({ item }) {
    return (
        <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
                style={{
                    width: "10%",
                    fontWeight: "bold",
                    color: "blue",
                    textAlign: "center",
                }}
            >
                {`${item.quantity}x`}
            </Text>
            <Text style={{ flex: 1 }}>{item.item}</Text>
            <Text>{`$${Number(item.price).toFixed(
                2
            )}`}</Text>
            <Text
                style={{
                    fontWeight: "bold",
                    width: "25%",
                    marginLeft: "10",
                    // color: "green",
                }}
            >
                {`$${(item.price * item.quantity).toFixed(
                    2
                )}`}
            </Text>
        </View>
    );
}

function ConsumoItemForm({ handleAddConsumo }) {
    const [consumoForm, setConsumoForm] =
        useState(defaultConsumo);

    return (
        <View style={{ gap: 5, flexDirection: "row" }}>
            <TextInput
                style={[
                    styles.inputUnderline,
                    { flex: 3, paddingVertical: 5 },
                ]}
                placeholder="Nombre del item"
                placeholderTextColor="gray"
                value={consumoForm.item}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        item: text,
                    })
                }
            />
            <TextInput
                style={[styles.inputUnderline, { flex: 2 }]}
                placeholder="Precio"
                placeholderTextColor="gray"
                value={consumoForm.price}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        price: text,
                    })
                }
            />
            <TextInput
                style={[
                    styles.inputUnderline,
                    { flex: 1, textAlign: "center" },
                ]}
                placeholder="Q"
                placeholderTextColor="gray"
                value={consumoForm.quantity}
                onChangeText={(text) =>
                    setConsumoForm({
                        ...consumoForm,
                        quantity: text,
                    })
                }
            />
            <Button
                title={
                    <Check
                        // <ArrowRight
                        size={20}
                        color="white"
                    />
                }
                style={{
                    paddingVertical: 5,
                }}
                onPress={() => {
                    handleAddConsumo(consumoForm);
                }}
                fw="initial"
            />
        </View>
    );
}

function InvitadoForm({ handleAddInvitado }) {
    const [invitadoForm, setInvitadoForm] =
        useState(defaultInvitado);
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 5,
                width: "100%",
            }}
        >
            <TextInput
                style={[styles.inputUnderline, { flex: 2 }]}
                placeholder="Nombre"
                value={invitadoForm.name}
                onChangeText={(text) =>
                    setInvitadoForm({
                        ...invitadoForm,
                        name: text,
                    })
                }
            />
            <Button
                title="Agregar"
                onPress={() => {
                    handleAddInvitado(invitadoForm);
                    setInvitadoForm(defaultInvitado);
                }}
                fw="initial"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputUnderline: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        fontSize: 14,
        paddingHorizontal: 10,
    },
    consumoForm: {
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
});
