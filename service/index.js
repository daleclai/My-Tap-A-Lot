const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}?retryWrites=true&w=majority';

const client = new MongoClient(config.url);
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

async function updateUser(email, token) {
  return db.collection('users').updateOne({ email }, { $set: { token } });
}

async function getLeaderboard() {
  return db.collection('users')
    .find({}, { projection: { email: 1, score: 1 } })
    .sort({ score: -1 })
    .limit(10)
    .toArray();
}

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
  };
 
  users.push(user);
  res.cookie(authCookie, user.token, { sameSite: 'strict' });
  res.send({ email: user.email });
});

app.post('/api/auth/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    res.cookie(authCookie, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.delete('/api/auth/logout', (req, res) => {
  const user = users.find((u) => u.token === req.cookies[authCookie]);
  if (user) user.token = null;
  res.clearCookie(authCookie);
  res.status(204).end();
});


app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.send({ email: req.user.email });
});

app.get('/api/score', verifyAuth, (req, res) => {
  res.send({ score: req.user.score });
});

app.post('/api/score', verifyAuth, (req, res) => {
  req.user.score = Number(req.body.score);
  res.send({ score: req.user.score });
});

app.get('/api/leaderboard', (_req, res) => {
  const top10 = users
    .map((u) => ({ email: u.email, score: u.score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.send(top10);
});

app.get('/api/quote', async (_req, res) => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    res.send({ quote: data.slip.advice });
  } catch {
    res.send({ quote: 'Keep tapping!' });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});