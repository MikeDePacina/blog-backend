require("dotenv").config();
const { response } = require("express");
const express = require("express");
const { reset } = require("nodemon");
const port = process.env.PORT || 2000;
const app = express();
const db = require("./db.js");

app.use(express.json());

app.get("/api/albums", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM album");
  res.send(rows);
});

app.get("/api/albums/:name", async (req, res) => {
  const name = req.params.name;
  const { rows } = await db.query(
    `SELECT album_id FROM album WHERE name='${name}'`
  );
  res.send(rows);
});

app.get("/api/songs", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM song");
  res.send(rows);
});

app.post("/api/albums", async (req, res) => {
  const { name, artist, genre } = req.body;
  const { rows } = await db.query(
    `INSERT INTO album(name,artist,genre) VALUES('${name}','${artist}','${genre}') RETURNING name`
  );
  res.send(rows);
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await db.query(
    `INSERT INTO users(username,password) VALUES('${username}', '${password}') RETURNING username`
  );
  res.send(rows);
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await db.query(
    `SELECT username FROM users WHERE username='${username}' AND password='${password}'`
  );
  if (rows == [[]]) res.send("Wrong login info");
  else res.send(rows);
});

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});

app.get;
