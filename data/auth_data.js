import { getUsers } from '../db/database.js';
import MongoDB from 'mongodb';
const ObjectId = MongoDB.ObjectId;

export async function findByUsername(username) {
  return getUsers() //
    .findOne({ username })
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers() //
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers() //
    .insertOne(user)
    .then((data) => {
      // console.log(data.insertedId.toString());
      return data.insertedId.toString();
    });
}

function mapOptionalUser(data) {
  return data ? { ...data, id: data._id.toString() } : data;
}
