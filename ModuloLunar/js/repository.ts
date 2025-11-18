import {  Mineral } from "./types.js";

interface IRepositorio {
  agregar(mineral: Mineral) : void;
  obtenerTodos(callback: (minerales: Mineral[]) => void): void;
}

export class Repositorio implements IRepositorio {

  agregar(mineral: Mineral): void {
    const transaction = db.transaction(['rocas_db'], 'readwrite');
    const store = transaction.objectStore('rocas_db');
    store.add(mineral);
    transaction.addEventListener('complete', () => console.log('Mineral agregado'));
    transaction.addEventListener('error', () => console.log('Error al agregar mineral'));
  } 
    obtenerTodos(callback: (minerales: Mineral[]) => void): void {
    const transaction = db.transaction(['rocas_db'], 'readonly');
    const store = transaction.objectStore('rocas_db');
    const request = store.getAll();
    request.addEventListener('success', () => {
      callback(request.result);
    });
    request.addEventListener('error', () => console.log('Error al obtener minerales'));
  } 
}

let db: IDBDatabase | null = null;
const openOrCreateDB: IDBOpenDBRequest = window.indexedDB.open('rocas_db', 1);