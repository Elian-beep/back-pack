import { Button, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import Title from "../components/Title";
import CategoryBlock from "../components/CategoryBlock";
import AddButton from "../components/AddButton";

import { createCategory, getAllCategories, updateCategory } from '../services/sqlite/Category';
import { ICategory } from "../interfaces/ICategory";
import { useEffect, useState } from "react";
import ListItems from "./ListItems";
import BackButton from "../components/BackButton";
import IItem from "../interfaces/IItem";


export default function Main() {
    const printCategory = (category: ICategory) => {
        console.log(`id:${category.id}, categoria:${category.name}`);
    }

    const [categories, setCategories] = useState<ICategory[]>();
    const [newCategory, setNewCategory] = useState<ICategory>({ id: null, name: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenList, setIsOpenList] = useState(false);
    const [clickedCategory, setClickedCategory] = useState<ICategory>();

    useEffect(() => {
        showCat();
    }, [categories]);

    const showCat = async () => {
        await getAllCategories().then((cat: ICategory[]) => {
            setCategories(cat);
        });
    }

    const addCat = async (cat: ICategory) => {
        try {
            if (cat.name != "") {
                if (!isEdit) {
                    createCategory(cat)
                        .then(id => console.log('Categoria criada com o id: ' + id))
                        .catch(err => console.log(err));
                    setCategories(prevCategories => [...prevCategories, cat]);
                } else {
                    updateCategory(cat)
                        .then(updated => console.log("Categoria alterada:" + updated))
                        .catch(err => console.log(err));
                }
                setNewCategory({ name: "" });
            }
            setIsEdit(false);
        } catch (error) {
            console.log("Erro ao criar nova categoria: ", +error);
        }
    }

    const editCat = async (cat: ICategory) => {
        setNewCategory(cat);
        setIsEdit(true);
    }

    const handleCategory = (isOpenCategory: boolean, cat?: ICategory) => {
        setIsOpenList(isOpenCategory);
        if (cat != null) setClickedCategory(cat);
    }

    return (
        <View style={styles.container}>
            {/* <Button title="remover varios" onPress={() => removeCat(1)} /> */}
            <Title>Mochila de Viagem</Title>
            {isOpenList && 
                <View>
                    <BackButton onPress={() => setIsOpenList(false)} />
                </View>
            }
            {!isOpenList &&
                <View style={styles.formControl}>
                    <TextInput value={newCategory.name} onChangeText={text => setNewCategory({ id: newCategory.id, name: text })} placeholder="Nome da nova categoria" style={styles.inputText} />
                    <AddButton onPress={() => addCat(newCategory)} />
                </View>
            }
            <ScrollView>
                <View style={styles.contentCategories}>
                    {categories && (
                        !isOpenList && (
                            categories.map(category => (
                                <CategoryBlock onOpenList={handleCategory} onEditCategory={editCat} category={category} key={category.id} title={category.name} />
                            ))
                        )
                    )}
                    {isOpenList &&
                        <ListItems category={clickedCategory} />
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 30
    },
    formControl: {
        width: "100%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 40
    },
    inputText: {
        borderBottomWidth: .5,
        borderRadius: 5,
        padding: 10,
        height: 35,
        fontSize: 14,
        width: "80%"
    },
    contentCategories: {
        height: "100%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 20,
        marginTop: 30
    }
});