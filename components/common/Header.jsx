import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Logo from "./Logo";

export default function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Logo />
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
            >
                <Ionicons
                    name="person-circle-sharp"
                    size={30}
                    // color="blue"
                />
            </TouchableOpacity>
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
