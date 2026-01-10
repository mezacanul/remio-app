import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

export default function BackButton({ callback }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                callback && callback();
                navigation.goBack();
            }}
            style={{
                width: "100%",
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    textDecorationLine: "underline",
                    fontSize: 16,
                }}
            >
                {"Atrás"}
            </Text>
        </TouchableOpacity>
    );
}
