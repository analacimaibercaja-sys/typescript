let db: IDBDatabase | null = null;
const openOrCreateDB: IDBOpenDBRequest = window.indexedDB.open('rocas_db', 1);

openOrCreateDB.addEventListener('error', () => console.error('Error al abrir la base de datos'));

openOrCreateDB.addEventListener('success', () => {
  console.log('Successfully opened DB');
  db = openOrCreateDB.result;
  //showTodos();
});


openOrCreateDB.addEventListener('upgradeneeded', (init: IDBVersionChangeEvent) => {
  db = (init.target as IDBOpenDBRequest).result;

  db.onerror = () => {
    console.error('Error al cargar la base de datos.');
  };

  const table = db.createObjectStore('rocas_db', { keyPath: 'id', autoIncrement:true });

  table.createIndex('identificador', 'identificador', { unique: false });
  table.createIndex('nombre', 'nombre', { unique: false });
});