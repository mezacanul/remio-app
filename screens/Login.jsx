import { useNavigation } from "@react-navigation/native";
import { loadHook } from "lattice-design";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";

export default function Login() {
    return (
        <View style={styles.container}>
            <Logo size="md" />
            <LoginForm />
        </View>
    );
}

function LoginForm() {
    const navigation = useNavigation();
    const [user, setUser] = loadHook("useUser");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleLogin = () => {
        setUser({
            email: form.email,
            password: form.password,
        });
        navigation.navigate("Home");
    };

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="gray"
                value={form.email}
                onChangeText={(text) =>
                    setForm({ ...form, email: text })
                }
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                value={form.password}
                onChangeText={(text) =>
                    setForm({ ...form, password: text })
                }
            />
            <Button
                style={styles.button}
                title="Iniciar sesión"
                onPress={handleLogin}
                disabled={
                    form.email === "" ||
                    form.password === ""
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    form: {
        gap: 10,
        width: "60%",
        marginHorizontal: "auto",
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 5,
    },
});
