import { loadHook } from "lattice-design";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Button from "../components/common/Button";
import InputUnderline from "../components/common/InputUnderline";
import { isGreaterThanZero } from "../utils/main";

export default function Onboarding({ navigation }) {
    const [cuenta, setCuenta] = loadHook("useCuenta");
    // const [total, setTotal] = useState("");

    const handleTotalChange = (text) => {
        const number = text.replace("$", "");
        if (number == "") {
            setCuenta({
                ...cuenta,
                total: "",
            });
        } else {
            setCuenta({
                ...cuenta,
                total: `$${number}`,
            });
        }
    };
    
    return (
        // <Layout>
        <>
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
                        <InputUnderline
                            value={cuenta.total}
                            placeholder="$0.00"
                            keyboardType="numeric"
                            onChangeText={handleTotalChange}
                        />

                        <Button
                            title="Siguiente"
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate(
                                    "PreOptions"
                                );
                            }}
                            style={{
                                width: "40%",
                            }}
                            disabled={
                                !isGreaterThanZero(
                                    cuenta.total
                                ) || cuenta.total == ""
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
        // </Layout>
    );
}
