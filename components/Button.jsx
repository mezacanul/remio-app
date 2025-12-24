import { Text, TouchableOpacity } from "react-native";

export default function Button({
    title,
    onPress,
    style,
    disabled,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 8,
                opacity: disabled ? 0.5 : 1,
                ...style,
            }}
            disabled={disabled}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
