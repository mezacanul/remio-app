import { StyleSheet, View } from "react-native";
import ItemRow from "./ItemRow";
import ItemsListHeader from "./ItemsListHeader";

export default function ItemsList({ items }) {
    return (
        <View style={styles.itemsList}>
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

const styles = StyleSheet.create({
    itemsList: {
        gap: 10,
        marginTop: 20,
        marginBottom: 5,
    },
});
