import { Martini } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const sizeMap = {
    icon: {
        sm: 20,
        md: 24,
        lg: 28,
    },
    text: {
        sm: 24,
        md: 28,
        lg: 32,
    },
};

export default function Logo({ size = "sm" }) {
    return (
        <View style={styles.logoContainer}>
            <Martini
                size={sizeMap.icon[size]}
                color="blue"
            />
            <Text
                style={[
                    styles.logo,
                    { fontSize: sizeMap.text[size] },
                ]}
            >
                {"REMIU"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        fontWeight: "bold",
        color: "blue",
        // borderBottomWidth: 1.5,
        borderBottomColor: "blue",
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
});
