"use strict";
let db = null;
const openOrCreateDB = window.indexedDB.open('rocas_db', 1);
openOrCreateDB.addEventListener('error', () => console.error('Error al abrir la base de datos'));
openOrCreateDB.addEventListener('success', () => {
    console.log('Successfully opened DB');
    db = openOrCreateDB.result;
});
openOrCreateDB.addEventListener('upgradeneeded', (init) => {
    db = init.target.result;
    db.onerror = () => {
        console.error('Error al cargar la base de datos.');
    };
    const table = db.createObjectStore('rocas_db', { keyPath: 'id', autoIncrement: true });
    table.createIndex('identificador', 'identificador', { unique: false });
    table.createIndex('nombre', 'nombre', { unique: false });
});
//# sourceMappingURL=mineralesValidos.js.map