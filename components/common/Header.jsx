import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Logo from "./Logo";
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

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        // paddingTop: 10,
        paddingVertical: 10,
    },
});
