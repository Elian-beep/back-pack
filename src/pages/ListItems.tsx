import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ICategory } from "../interfaces/ICategory";
import IItem from "../interfaces/IItem";
import { useEffect, useState } from "react";
import { createItem, getAllItemsByCategory, removeItem, updateItem } from "../services/sqlite/Item";
import AddButton from "../components/AddButton";
import { Ionicons } from "@expo/vector-icons";

interface ListItemsProps {
    category: ICategory
}


export default function ListItems({ category }: ListItemsProps) {
    const [itemsList, setItemsList] = useState<IItem[]>([]);
    const [newItem, setNewItem] = useState<IItem>({ id: null, name: "", qtd: "", category_id: category.id });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        showItems();
    }, [itemsList]);

    const printItem = (item: IItem) => {
        console.log(`id:${item.id}, nome:${item.name}, qtd: ${item.qtd}, categoria: ${item.category_id}`);
    }

    const showItems = async () => {
        await getAllItemsByCategory(category.id).then((items: IItem[]) => {
            setItemsList(items);
        })
    }

    const addItem = async (item: IItem) => {
        if(item.name != ""){
            if(!isEdit){
                await createItem(item)
                    .then(id => console.log('Item criado com o id: ' + id))
                    .catch(err => console.log(err));
                setItemsList(prevItems => [...prevItems, item])
            }else{
                updateItem(item)
                    .then(updated => console.log("Item alterado: "+updated))
                    .catch(err => console.log(err))
            }
            setNewItem({ id: null, name: "", qtd: "", category_id: category.id });
        }
        setIsEdit(false);
    }

    const delItem = async (id: number) => {
        await removeItem(id)
            .then(updated => console.log('Item removido: '+updated))
            .catch(err => console.log(err))
    }

    const editItem = async (item: IItem) => {
        setNewItem(item);
        setIsEdit(true);
    }

    return (
        <>
            {/* <Button title="teste" onPress={showItems} /> */}
            <Text style={styles.title} >{category.name}</Text>
            <View style={styles.formControl}>
                <TextInput keyboardType='numeric' value={newItem.qtd} onChangeText={text => setNewItem({ id: newItem.id, name: newItem.name, qtd: text, category_id: category.id })} placeholder="Qtd" style={styles.inputNumber} />
                <TextInput value={newItem.name} onChangeText={text => setNewItem({ id: newItem.id, name: text, qtd: newItem.qtd, category_id: category.id })} placeholder="Nome do Item" style={styles.inputText} />
                <AddButton onPress={() => addItem(newItem)} />
            </View>
            {
                itemsList &&
                itemsList.map(item => (
                    <View style={styles.contentItem} key={item.id} >
                        <Text>{item.qtd} - {item.name}</Text>
                        <View style={styles.groupButtons}>
                            <TouchableOpacity>
                                <Ionicons onPress={() => delItem(item.id)} name="trash" size={24} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons onPress={() => editItem(item)} name="pencil-sharp" size={24} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>)
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600"
    },
    formControl: {
        width: "100%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 40
    },
    inputNumber: {
        width: "15%",
        borderBottomWidth: .5,
        borderRadius: 5,
        padding: 10,
        height: 35,
        fontSize: 14,
    },
    inputText: {
        borderBottomWidth: .5,
        borderRadius: 5,
        padding: 10,
        height: 35,
        fontSize: 14,
        width: "70%"
    },
    contentItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    groupButtons: {
        display: "flex",
        flexDirection: "row",
        gap: 15
    }
});