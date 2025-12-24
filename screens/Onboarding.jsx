import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../components/Button";
import Layout from "../components/Layout";

export default function Onboarding({ navigation }) {
    const [total, setTotal] = useState("");

    const isGreaterThanZero = (total) => {
        const number = total.replace("$", "");
        return Number(number) > 0;
    };
    return (
        <Layout>
            <KeyboardAvoidingView
                // behavior="padding"
                style={{
                    flex: 1,
                }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
                keyboardVerticalOffset={
                    Platform.OS === "ios" ? -180 : -100
                }
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                    accessible={false}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 20,
                            marginTop: -60,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Total de la cuenta
                        </Text>
                        <TextInput
                            value={total}
                            placeholder="$0.00"
                            returnKeyType="done"
                            onSubmitEditing={() =>
                                Keyboard.dismiss()
                            }
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const number = text.replace(
                                    "$",
                                    ""
                                );
                                if (number == "") {
                                    setTotal("");
                                } else {
                                    setTotal(`$${number}`);
                                }
                            }}
                            style={{
                                fontSize: 25,
                                borderBottomWidth: 1,
                                borderColor: "gray",
                                paddingBottom: 8,
                                width: "50%",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        />

                        <Button
                            title="Siguiente"
                            onPress={() => {}}
                            style={{
                                width: "40%",
                            }}
                            disabled={
                                !isGreaterThanZero(total) ||
                                total == ""
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Layout>
    );
}
