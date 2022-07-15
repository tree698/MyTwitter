import MongoDB from 'mongodb';
// import { MongoClient } from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB() {
  return MongoDB.MongoClient.connect(config.db.host) //
    .then((client) => (db = client.db()));
}

// export async function connectDB() {
//   const client = new MongoClient(config.db.host);
//   db = client.db();
//   return db;
// }

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
