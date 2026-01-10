import { Ionicons } from "@expo/vector-icons";
import { Martini } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
export default function Header() {
    return (
        <View style={styles.container}>
            <Logo />
            <Ionicons
                name="person-circle-sharp"
                size={30}
                // color="blue"
            />
        </View>
    );
}

function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Martini
                size={20}
                color="blue"
            />
            <Text style={styles.logo}>{"REMIU"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        // paddingTop: 10,
        paddingVertical: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue",
        // textDecorationLine: "underline",
        borderBottomWidth: 1.5,
        borderBottomColor: "blue",
        // paddingBottom: 1,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
});
