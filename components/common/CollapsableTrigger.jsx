import {
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CollapsableTrigger({
    isOpen,
    onPress,
    title,
    total,
}) {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.wrapper}>
                {isOpen ? (
                    <ChevronUp size={20} />
                ) : (
                    <ChevronDown size={20} />
                )}
                <Text style={styles.title}>{title}</Text>
                <Text
                    style={[
                        styles.total,
                        {
                            fontWeight:
                                total > 0
                                    ? "bold"
                                    : "normal",
                            color:
                                total > 0 ? "blue" : "gray",
                            marginRight:
                                total > 0 ? 10 : 25,
                        },
                    ]}
                >
                    {total > 0
                        ? `$${Number(total).toFixed(2)}`
                        : "$ --"}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        gap: 5,
        width: "100%",
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontSize: 18,
    },
    total: {
        fontSize: 16,
    },
});
