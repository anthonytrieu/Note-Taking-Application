const config = require("./config");

// Express setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title TEXT, body TEXT, created_at TIMESTAMP DEFAULT NOW())")
    .catch(err => console.log(err));
});

// Express routes
app.get("/notes/all", async (req, res) => {
  const notes = await pgClient.query("SELECT * FROM notes");
  res.send(notes.rows);
});
//post method for /notes
app.post("/notes", async (req, res) => {
  const { title, body } = req.body;
  await pgClient.query("INSERT INTO notes (title, body) VALUES ($1, $2)", [title, body]);
  res.send({ success: true });
});
//update when note is modified
app.put("/notes/:id", async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  const existingNote = await pgClient.query("SELECT * FROM notes WHERE id=$1", [id]);

  if (existingNote.rows.length === 0) {
    return res.status(404).send({ error: "Note not found" });
  }
  await pgClient.query("UPDATE notes SET title=$1, body=$2 WHERE id=$3", [title, body, id]);
  res.send({ success: true });
});
//get the notes based on id
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await pgClient.query("SELECT * FROM notes WHERE id=$1", [id]);
  res.send(note.rows[0]);
});
//delete api for notes
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await pgClient.query("DELETE FROM notes WHERE id=$1", [id]);
  res.send({ success: true });
});

app.listen(8080, err => {
  console.log('Server is listening on port 8080');
});
