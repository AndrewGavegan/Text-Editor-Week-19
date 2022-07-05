import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');
  // creating the connection
  const Db = await openDB('jate', 1);
  // create a transaction and data privileges 
  const tx = Db.transaction('jate', 'readwrite');
  // open object store
  const store = tx.objectStore('jate');
  // use add method on the store
  const request = store.put({ jate: content });
  // confirmation message
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const Db = await openDB('jate', 1);

  const tx = Db.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');
  // use getall method to get all the databases data //
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
