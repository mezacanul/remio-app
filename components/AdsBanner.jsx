import {
  Image,
  StyleSheet,
  View
} from "react-native";
import bk from "../assets/images/bk.jpg";

export default function AdsBanner() {
    return (
        <View style={styles.container}>
            <Image
                source={bk}
                style={styles.image}
            />
            {/* <Text>AdsBanner</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "30%",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,
    },
});
