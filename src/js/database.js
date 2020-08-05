import idb from "idb";

function databasePromise(idb) {
  var dbPromise = idb.open("idb_sporTech-pwa", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("tim_favorit")) {
      var indexTimFav = upgradeDb.createObjectStore("tim_favorit", {
        keyPath: "id",
      });
      indexTimFav.createIndex("namaTim", "name", {
        unique: false,
      });
    }

    if (!upgradeDb.objectStoreNames.contains("pemain_favorit")) {
      var indexPlayerFav = upgradeDb.createObjectStore("pemain_favorit", {
        keyPath: "id",
      });
      indexPlayerFav.createIndex("namaPemain", "name", {
        unique: false,
      });
    }
  });

  return dbPromise;
}

export { databasePromise };
