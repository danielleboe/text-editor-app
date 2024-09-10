import { openDB } from 'idb';

export const initdb = async () => {
  // Create a new database named 'editorDb' with version 1
  openDB('editorDb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('content store already exists');
        return;
      }
      // Create a new object store named 'content' with a key named 'id' that will increment automatically
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('content store created');
    },
  });
};

export const putDb = async (content) => {
  console.log('PUT to the database');
  const editorDb = await openDB('editorDb', 1);
  const tx = editorDb.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const editorDb = await openDB('editorDb', 1);
  const tx = editorDb.transaction('content', 'readonly');
  const store = tx.objectStore('content');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.content;
};
