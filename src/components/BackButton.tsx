import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BackButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnBack}>
            <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnBack: {
        width: 60,
        borderWidth: .5,
        padding: 7,
        borderRadius: 10,
        marginTop: 20,
        // alignSelf: "flex-end"
    },
    text: {
        textAlign: "center"
    }
});