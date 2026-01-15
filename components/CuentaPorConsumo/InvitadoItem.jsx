import { useMemo, useState } from "react";
import { View } from "react-native";
import CollapsableTrigger from "../common/CollapsableTrigger";
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
            <CollapsableTrigger
                isOpen={isOpen}
                onPress={() => {
                    setIsOpen(!isOpen);
                }}
                title={invitado.name}
                total={total}
            />
            {isOpen && (
                <ConsumoList
                    items={invitado.items}
                    handleAddConsumo={handleAddConsumo}
                />
            )}
        </View>
    );
}