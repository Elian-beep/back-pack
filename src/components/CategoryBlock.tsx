import { ActionSheetIOS, Alert, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICategory } from "../interfaces/ICategory";
import { removeCategory } from "../services/sqlite/Category";
import { useState } from "react";

interface CategoryBlockProps {
    title: string,
    category: ICategory,
    onEditCategory: (category: ICategory) => void;
    onOpenList: (isOpenList: boolean, category: ICategory) => void
}

export default function CategoryBlock({ title, category, onEditCategory, onOpenList }: CategoryBlockProps) {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const openCategory = () => {
        onOpenList(true, category);
    }

    const removeCat = () => {
       Alert.alert(
            "Confirmação",
            `Deseja excluir ${category.name}?`,
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        await removeCategory(category.id)
                            .then(updated => console.log('Categoria removida: ' + updated))
                            .catch(err => console.log(err))
                    }
                },
                {
                    text: 'Não',
                    onPress: async () => { console.log("Clicado em não") }
                }
            ]
        );
        setShowContextMenu(false);
    }

    const editCat = () => {
        setShowContextMenu(false);
        onEditCategory(category);
    }

    return (
        <>
            <TouchableOpacity onPress={openCategory} onLongPress={() => setShowContextMenu(true)} style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                {
                    showContextMenu && (
                        <View style={styles.contextMenu}>
                            <TouchableOpacity onPress={editCat}>
                                <Text style={styles.itemList}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={removeCat}>
                                <Text style={styles.itemList}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowContextMenu(false)}>
                                <Text style={styles.itemList}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </TouchableOpacity>
        </>
    );
} 

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4af9c",
        width: 150,
        height: 75,
        borderRadius: 10,
    },
    
    text: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600"
    },
    contextMenu: {
        position: 'absolute',
        padding: 8,
        height: 75,
        backgroundColor: '#dfc3b5',
        top: 0,
        right: 0,
        borderRadius: 5,
        elevation: 3,
        zIndex: 1,
    },
    itemList: {
        fontSize: 14,
        textAlign: "center"
    }

});