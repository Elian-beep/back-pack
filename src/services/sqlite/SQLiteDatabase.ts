import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);',
            [],
            () => console.log('Tabela CATEGORIES criada com sucesso'),
            // (_, error) => console.error('Erro ao criar tabela:', error)
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, qtd TEXT, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id));',
            [],
            () => console.log('Tabela ITEMS criada com sucesso'),
            // (_, error) => console.error('Erro ao criar tabela:', error)
        );
    });
};

export { db, initializeDatabase };