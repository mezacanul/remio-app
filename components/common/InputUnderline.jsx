import { Keyboard, TextInput } from "react-native";

export default function InputUnderline({
    keyboardType,
    value,
    placeholder,
    onChangeText,
    style,
}) {
    return (
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholderTextColor="gray"
            keyboardType={keyboardType}
            style={{
                fontSize: 25,
                borderBottomWidth: 1,
                borderColor: "gray",
                paddingBottom: 8,
                width: "50%",
                textAlign: "center",
                fontWeight: "bold",
                ...style,
            }}
        />
    );
}
