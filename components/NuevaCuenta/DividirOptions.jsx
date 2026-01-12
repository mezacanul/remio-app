import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";

export default function DividirOptions({
    form,
    setForm,
    handleNext,
}) {
    function selectType(type) {
        setForm({
            ...form,
            dividirType: type,
        });
        handleNext(2);
    }

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    width: "60%",
                    marginHorizontal: "auto",
                }}
            >
                {"¿Como te gustaría dividir la cuenta?"}
            </Text>
            <View
                style={{
                    gap: 10,
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Button
                    title="Por Consumo"
                    fw="initial"
                    style={{
                        width: "50%",
                    }}
                    onPress={() => {
                        selectType("porConsumo");
                    }}
                />
                <Button
                    title="En Partes Iguales"
                    fw="initial"
                    style={{
                        width: "50%",
                    }}
                    onPress={() => {
                        selectType("enPartesIguales");
                    }}
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
        width: "100%",
        gap: 20,
    },
});
