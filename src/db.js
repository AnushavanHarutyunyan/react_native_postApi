// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('post.db');

// export class DB {
//     static init() {
//         return new Promise((resolve, reject) => {
//             db.transaction((tx) => {
//                 tx.executeSql(
//                     'CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY NOT NULL,text TEXT NOT NULL,img TEXT,date TEXT,booked INT)',
//                     [],
//                     resolve,
//                     (_, error) => reject(error)
//                 );
//             });
//         });
//     }
//     static getPosts() {
//         return new Promise((resoleve, reject) => {
//             db.transaction((tx) => {
//                 tx.executeSql(
//                     'SELECT * FROM posts',
//                     [],
//                     (_, result) => resoleve(result.rows._array),
//                     (_, error) => reject(error)
//                 );
//             });
//         });
//     }
// }
