import { View } from "react-native";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <View style={{ flex: 1, paddingTop: 60 }}>
            <Header />
            {children}
        </View>
    );
}
