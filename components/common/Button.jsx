import { Text, TouchableOpacity, View } from "react-native";

export default function Button({
    title,
    onPress,
    style,
    disabled,
    fw,
    fs,
    bgColor,
    icon,
    iconPosition,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: bgColor || "blue",
                padding: 10,
                borderRadius: 8,
                opacity: disabled ? 0.5 : 1,
                ...style,
            }}
            disabled={disabled}
        >
            <View
                style={{
                    flexDirection:
                        iconPosition === "left"
                            ? "row-reverse"
                            : "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon && icon}
                <Text
                    style={{
                        color: "white",
                        fontSize: fs || 16,
                        textAlign: "center",
                        fontWeight: fw || "bold",
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
