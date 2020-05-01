import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'patients';

// eslint-disable-next-line
let db;
// Use connect method to connect to the server
export function initDb(next) {
  MongoClient.connect(url, (err, client) => {
    console.log('Connected successfully to server');

    db = client.db(dbName);

    next();
  });
}

export { db };
