import { StyleSheet, Text, View } from "react-native";

export default function ItemsListHeader() {
    return (
        <View style={styles.itemsListHeader}>
            <Text
                style={[
                    styles.itemsListTH,
                    {
                        width: "10%",
                    },
                ]}
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
                style={[
                    styles.itemsListTH,
                    {
                        width: "25%",
                        marginLeft: "10",
                    },
                ]}
            >
                Total
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemsListHeader: {
        flexDirection: "row",
        gap: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgray",
        paddingBottom: 5,
    },
    itemsListTH: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
