import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface TitleProps {
    children: ReactNode
}

export default function Title({children}: TitleProps){
    return(
        <Text style={styles.title} >{children}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    }
});