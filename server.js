require("dotenv").config();

const express = require("express");
const path = require("path");
const { saveMessage } = require("./db");
const { sendContactEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", async (req, res) => {
  const body = req.body || {};
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const topic = String(body.topic || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email) {
    return res.status(400).json({ ok: false, error: "Name and email are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
  }

  let id;
  try {
    id = saveMessage({ name, phone, email, topic, message });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return res.status(500).json({ ok: false, error: "Something went wrong saving your message." });
  }

  try {
    await sendContactEmail({ name, phone, email, topic, message });
  } catch (err) {
    console.error("Failed to send contact email (message was still saved):", err);
    return res.status(200).json({
      ok: true,
      id,
      warning: "Your message was saved, but the notification email could not be sent.",
    });
  }

  res.status(200).json({ ok: true, id });
});

app.listen(PORT, () => {
  console.log(`NW Real Estate server running at http://localhost:${PORT}`);
});
