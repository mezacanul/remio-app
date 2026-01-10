import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./Header";

export default function Layout({ children }) {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F3F3F3",
                paddingHorizontal: 20,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <Header />
            {children}
        </View>
    );
}
