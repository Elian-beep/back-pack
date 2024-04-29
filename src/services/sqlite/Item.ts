import IItem from "../../interfaces/IItem";
import { db } from "./SQLiteDatabase";

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXIST items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, qtd TEXT, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id));"
    );
});

const createItem = (obj: IItem) => {
    return new Promise((resolve, reject) => {
        
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO items (name, qtd, category_id) VALUES (?, ?, ?);',
                [obj.name, obj.qtd, obj.category_id],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject(new Error('Erro ao inserir item ' + JSON.stringify(obj)));
                },
                // (_, error) => reject(error)
                );
        });
    });
}

const updateItem = (obj: IItem) => {
    return new Promise((resolve, reject) => {
        db.transaction(tsx => {
            tsx.executeSql(
                "UPDATE items SET name=?, qtd=? WHERE id=?;",
                [obj.name, obj.qtd, obj.id],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) resolve(rowsAffected)
                    else reject("Erro ao atualizar: id=" + obj.id);
                },
                // (_, error) => reject(error)
            )
        });
    })
}

const getAllItemsByCategory = (category_id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM items WHERE category_id=?;',
                [category_id],
                (_, { rows }) => resolve(rows._array),
                // (_, error) => reject(error)
            );
        });
    });
};

const removeItem = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tsx => {
            tsx.executeSql(
                "DELETE FROM items WHERE id=?",
                [id],
                (_, rowsAffected) => {
                    resolve(rowsAffected);
                },
                // (_, error) => reject(error)
            )
        })
    })
}

export { createItem, getAllItemsByCategory, removeItem, updateItem }