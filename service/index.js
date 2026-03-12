const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];

const authCookie = "token";

function verifyAuth(req, res, next) {
  const user = users.find((u) => u.token === req.cookies[authCookie]);
  if (user) {
    req.user = user;   
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}
 

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;
 
  if (users.find((u) => u.email === email)) {
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