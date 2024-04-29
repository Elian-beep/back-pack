import { ICategory } from "../../interfaces/ICategory";
import { db } from "./SQLiteDatabase";

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXIST categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
    );
});

const createCategory = (obj: ICategory) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO categories (name) VALUES (?);',
                [obj.name],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject(new Error('Erro ao inserir categoria ' + JSON.stringify(obj)));
                },
                // (_, error) => reject(error)
            );
        });
    });
};

const updateCategory = (obj: ICategory) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE categories SET name=? WHERE id=?;",
                [obj.name, obj.id],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) resolve(rowsAffected)
                    else reject("Erro ao atualizar: id=" + obj.id);
                },
                // (_, error) => reject(error)
            );
        });
    });
}


const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM categories;',
                [],
                (_, { rows }) => resolve(rows._array),
                // (_, error) => reject(error)
            );
        });
    });
};

const removeCategory = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM categories WHERE id=?;",
                [id],
                (_, rowsAffected) => {
                    resolve(rowsAffected);
                },
                // (_, error) => reject(error)
            );
        })
    });
}

export { createCategory, getAllCategories, removeCategory, updateCategory };