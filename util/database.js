import * as SQLite from "expo-sqlite";

// Veritabanını açıyoruz
const database = SQLite.openDatabaseSync("places.db");

// Tablomuzu oluşturuyoruz (varsa yeniden oluşturmaz)
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );`,
        [],
        () => {
          resolve(); // başarılıysa
        },
        (_, error) => {
          reject(error); // hata varsa
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Places (title,imageUri,address,lat,lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result)=>{
          console.log(result)
          resolve(result)
        },
        (_, error)=>{
          reject(error)
        }
      );
    });
  });
}
