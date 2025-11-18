
openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));

openOrCreateDB.addEventListener('success', () => {
  console.log('Successfully opened DB');
  db = openOrCreateDB.result;
  mostrarInventario();
});

openOrCreateDB.addEventListener('upgradeneeded', (init: IDBVersionChangeEvent) => {
  db = (init.target as IDBOpenDBRequest).result;

  db.onerror = () => {
    console.error('Error loading database.');
  };

  const table = db.createObjectStore('rocas_db', { keyPath: 'id', autoIncrement:true });

  table.createIndex('identificador', 'identificador', { unique: false });
  table.createIndex('nombre', 'nombre', { unique: false });
});

const rocas = document.querySelector('ol') as HTMLOListElement;


function mostrarInventario() {
  while (rocas.firstChild) {
    rocas.removeChild(rocas.firstChild);
  }
  const objectStore = db!.transaction('rocas_db').objectStore('rocas_db');
  objectStore.openCursor().addEventListener('success', e => {
    const pointer = (e.target as IDBRequest).result;
    if(pointer) {
      const listItem = document.createElement('li');
      const h3 = document.createElement('h3');
      const pg = document.createElement('p');
      listItem.appendChild(h3);
      listItem.appendChild(pg);
      rocas.appendChild(listItem);
      h3.textContent = pointer.value.identificador;
      pg.textContent = pointer.value.nombre;
      listItem.setAttribute('data-id', pointer.value.id.toString());
      pointer.continue();
    } else {
      if(!rocas.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No hay rocas.';
        rocas.appendChild(listItem);
      }
    }
  });
}
