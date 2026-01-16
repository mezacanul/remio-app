import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import InputUnderline from "../common/InputUnderline";

export default function DividirOptions({
    form,
    setForm,
    handleNext,
}) {
    const [totalType, setTotalType] = useState(null);

    function selectType(type) {
        setTotalType(type);
        if (type === "total") {
            setForm({
                ...form,
                total: 0,
                invitados: 0,
            });
        } else if (type === "aportaciones") {
            setForm({
                ...form,
                total: [],
                invitados: 0,
            });
            handleNext(3);
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    gap: 20,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                    }}
                >
                    {"Total de la cuenta"}
                </Text>
                {!totalType &&
                    form.dividirType !== "porConsumo" && (
                        <SelectTotalType
                            selectType={selectType}
                        />
                    )}

                {(form.dividirType === "porConsumo" ||
                    totalType === "total") && (
                    <SetTotal
                        form={form}
                        setForm={setForm}
                        handleNext={handleNext}
                    />
                )}

                {/* {totalType === "aportaciones" && (
                    <View>
                        <Text>Aportaciones</Text>
                    </View>
                )} */}
            </View>
        </View>
    );
}

function SelectTotalType({ selectType }) {
    return (
        <View style={styles.selectTotalTypeContainer}>
            <Button
                title="Fijo"
                fw="initial"
                style={{
                    width: "50%",
                }}
                onPress={() => {
                    selectType("total");
                }}
            />
            <Button
                title="Aportaciones"
                fw="initial"
                style={{
                    width: "50%",
                }}
                onPress={() => {
                    selectType("aportaciones");
                }}
            />
        </View>
    );
}

function SetTotal({ form, setForm, handleNext }) {
    const [total, setTotal] = useState(0);

    function onNext() {
        // Keyboard.dismiss();
        // navigation.navigate("PreOptions");
        setForm({
            ...form,
            total: total,
        });
        handleNext(3);
    }
    return (
        <View
            style={{
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                width: "100%",
                // marginTop: -60,
            }}
        >
            <InputUnderline
                value={total}
                placeholder="$0.00"
                keyboardType="numeric"
                onChangeText={(text) => {
                    setTotal(parseFloat(text));
                }}
            />

            <Button
                title="Siguiente"
                onPress={onNext}
                style={{
                    width: "40%",
                }}
                disabled={total === 0}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    selectTotalTypeContainer: {
        gap: 10,
        width: "100%",
        alignItems: "center",
    },
});
