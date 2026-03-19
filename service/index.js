const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig');
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}?retryWrites=true&w=majority`;

const client = new MongoClient(url);
const db = client.db(config.database);

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


const authCookie = "token";

async function verifyAuth(req, res, next) {
  const user = await getUserByToken(req.cookies[authCookie]);
  if (user) {
    req.user = user;   
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}


async function getUser(email) {
  return db.collection('users').findOne({ email });
}

async function getUserByToken(token) {
  return db.collection('users').findOne({ token });
}

async function createUser(user) {
  return db.collection('users').insertOne(user);
}

async function updateUser(email, fields) {
  return db.collection('users').updateOne({ email }, { $set: fields });
}

async function getLeaderboard() {
  return db.collection('users')
    .find({}, { projection: { email: 1, score: 1 } })
    .sort({ score: -1 })
    .limit(10)
    .toArray();
}

(async () => {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connection to ${config.database}`);
  } catch (ex) {
    console.error(`DB connection failed: ${ex.message}`);
    process.exit(1);
  } 
})();

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;
 
  if (await getUser(email)) {
    return res.status(409).send({ msg: 'User already exists' });
  }
 
  const user = {
    email,
    password: await bcrypt.hash(password, 10),
    token: uuid.v4(),
    score: 0,
    inventory: [],  
    activeBackground: null,
    activeButtonSkin: null,
  };
 
  await createUser(user);
  res.cookie(authCookie, user.token, { sameSite: 'strict' });
  res.send({ email: user.email });
});

app.post('/api/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = uuid.v4();
    await updateUser(user.email, { token });
    res.cookie(authCookie, token, { sameSite: 'strict' });
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.delete('/api/auth/logout', async (req, res) => {
  const user = await getUserByToken(req.cookies[authCookie]);
  if (user) await updateUser(user.email, { token: null });
  res.clearCookie(authCookie);
  res.status(204).end();
});


app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.send({ email: req.user.email });
});

app.get('/api/score', verifyAuth, (req, res) => {
  res.send({ score: req.user.score });
});

app.get('/api/inventory/state', verifyAuth, async (req, res) => {
  res.send({
    inventory: req.user.inventory || [],
    activeBackground: req.user.activeBackground || null,
    activeButtonSkin: req.user.activeButtonSkin || null,
  });
});

app.post('/api/inventory/state', verifyAuth, async (req, res) => {
  const { owned, activeBackground, activeButtonSkin } = req.body;
  await updateUser(req.user.email, {
    inventory: owned || [],
    activeBackground: activeBackground || null,
    activeButtonSkin: activeButtonSkin || null,
  });
  res.send({ ok: true });
});

app.post('/api/score', verifyAuth, async (req, res) => {
  const score = Number(req.body.score);
  await updateUser(req.user.email, { score });
  res.send({ score });
});



app.get('/api/leaderboard', async (_req, res) => {
  const top10 = await getLeaderboard();
  res.send(top10);
});

app.get('/api/quote', async (_req, res) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit,religious,political&type=single');
    const data = await response.json();
    res.send({ quote: data.joke });
  } catch {
    res.send({ quote: 'Keep tapping!' });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});