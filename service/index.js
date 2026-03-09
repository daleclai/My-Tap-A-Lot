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
let items = [];

const authCookie = "token";

app.post('/api/auth/create', async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = {
    email: req.body.email,
    password: passwordHash,
    token: uuid.v4()
  };

  users.push(user);

  res.cookie(authCookie, user.token);
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
  res.clearCookie(authCookie);
  res.status(204).end();
});

function verifyAuth(req, res, next) {
  const user = users.find(u => u.token === req.cookies[authCookie]);

  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
}

app.get('/api/data', verifyAuth, (req, res) => {
  res.send(items);
});

app.post('/api/data', verifyAuth, (req, res) => {
  items.push(req.body);
  res.send(items);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});