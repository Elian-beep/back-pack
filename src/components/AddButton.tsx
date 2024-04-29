import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function AddButton({ onPress }){

    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4ebe6",
        padding: 5,
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    icon: {
        fontSize: 18,
        fontWeight: "500"
    }
});