const dbPromised = idb.open("premier", 1, upgradeDb => {
    const premierObjectStore = upgradeDb.createObjectStore("premier", {
        keyPath: "id"
    });
    premierObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function addTeam(team) {
    dbPromised
        .then(db => {
            const tx = db.transaction("premier", "readwrite");
            const store = tx.objectStore("premier");
            console.log("disimpan");
            store.add(team);
            return tx.complete;
        })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("premier", "readonly");
                const store = tx.objectStore("premier");
                return store.getAll();
            })
            .then(premier => {
                resolve(premier);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("premier", "readonly");
                const store = tx.objectStore("premier");
                return store.get(parseInt(id));
            })
            .then(team => resolve(team))
            .catch(error => reject(error));
    });
}


function deleteTeam(team) {
    dbPromised
        .then(db => {
            const tx = db.transaction("premier", "readwrite");
            const store = tx.objectStore("premier");
            console.log(team);
            store.delete(team);
            return tx.complete;
        })
}

function exist(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("premier", "readonly");
                const store = tx.objectStore("premier");
                return store.get(id);
            })
            .then(team => {
                if (team) {
                    resolve(true);
                } else {
                    reject(team);
                }
            });
    });
}