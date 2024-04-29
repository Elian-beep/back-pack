// import SQLite from 'react-native-sqlite-storage';

// ---------------------------------------------------------------



// ---------------------------------------------------------------

// export const db = SQLite.openDatabase({
//     name: 'backpack.db',
//     location: 'default',
// });

// db.transaction((tx) => {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');});

// db.transaction((tx) => {tx.executeSql('INSERT INTO categories (name) VALUES (?)', ['Roupas']);});

// db.transaction((tx) => {
//     tx.executeSql('SELECT * FROM users', [], (tx, results) => {
//         const len = results.rows.length;
//         for (let i = 0; i < len; i++) { 
//             const row = results.rows.item(i); 
//             console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`); 
//         } 
//     }); 
// });

// ---------------------------------------------------------------

// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

// const database_name = "Backpack.db";
// const database_version = "1.0";
// const database_displayname = "BackPack - React Native";
// const database_size = 20000;

// export default class Database {
//     Connect(){
//         let db;
//         return new Promise(resolve => {
//             SQLite.echoTest().then(() => {
//                 SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
//                     db = DB;
//                     db.executeSql('SELECT 1 FROM Category LIMIT 1').then(() => {
//                         console.log("Pronto...");
//                     }).catch(error => {
//                         console.log("Deu erro");
//                         console.log(error);
//                         db.transaction((tx) => {
//                             tx.executeSql('CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))');
//                         }).then(() => {
//                             console.log("tabela criada");
//                         }).catch(error => {
//                             console.log(error);
//                         });
//                     });
//                     resolve(db);
//                 }).catch(error => {
//                         console.log(error);
//                 }) ;
//             }).catch(error => {
//                 console.log(error);
                
//             });
//         });
//     }
// }

// ---------------------------------------------------------------