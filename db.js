const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync(path.join(__dirname, "messages.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    topic TEXT,
    message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const insertMessage = db.prepare(`
  INSERT INTO messages (name, phone, email, topic, message)
  VALUES (?, ?, ?, ?, ?)
`);

function saveMessage({ name, phone, email, topic, message }) {
  const result = insertMessage.run(name, phone || null, email, topic || null, message || null);
  return Number(result.lastInsertRowid);
}

module.exports = { db, saveMessage };
