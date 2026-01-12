import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../common/Button";

export default function TituloInput({
    form,
    setForm,
    handleNext,
}) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la cuenta"
                placeholderTextColor="gray"
                value={form.titulo}
                onChangeText={(text) =>
                    setForm({ ...form, titulo: text })
                }
            />
            <View style={styles.buttonsContainer}>
                <Button
                    title="Cancelar"
                    fw="normal"
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                />
                <Button
                    title="Siguiente"
                    fw="normal"
                    style={styles.button}
                    onPress={() => handleNext(1)}
                    disabled={form.titulo === ""}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 20,
        width: "100%",
        // borderWidth: 1,
        // borderColor: "red",
        // marginTop: -100,
    },
    title: {
        fontSize: 20,
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: "2%",
        width: "80%",
    },
    button: {
        width: "49%",
    },
});
