import MongoDB from 'mongodb';
// import { MongoClient } from 'mongodb';
import { config } from '../config.js';

export async function connectDB() {
  return MongoDB.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
}

// export async function connectDB() {
//   const client = new MongoClient(config.db.host);
//   return client.db();
// }
