import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}

// let tweets = [
//   {
//     id: '1',
//     text: '드림코더분들 화이팅!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: '안뇽!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
// ];

// export async function getAll() {
//   return Promise.all(
//     tweets.map(async (tweet) => {
//       const { username, name, url } = await userRepository.findById(
//         tweet.userId
//       );
//       return { ...tweet, username, name, url };
//     })
//   );
// }

// export async function getAllByUsername(username) {
//   return getAll().then((tweets) =>
//     tweets.filter((tweet) => tweet.username === username)
//   );
// }

// export async function getById(id) {
//   const found = tweets.find((tweet) => tweet.id === id);
//   if (!found) {
//     return null;
//   }
//   const { username, name, url } = await userRepository.findById(found.userId);
//   return { ...found, username, name, url };
// }

// export async function create(text, userId) {
//   const tweet = {
//     id: Date.now().toString(),
//     text,
//     createdAt: new Date(),
//     userId,
//   };
//   tweets = [tweet, ...tweets];
//   return getById(tweet.id);
// }

// export async function update(id, newText) {
//   const tweet = tweets.find((tweet) => tweet.id === id);
//   if (tweet) {
//     tweet.text = newText;
//   }
//   return getById(tweet.id);
// }

// export async function remove(id) {
//   tweets = tweets.filter((tweet) => tweet.id !== id);
// }
