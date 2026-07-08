const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendContactEmail({ name, phone, email, topic, message }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;

  await transporter.sendMail({
    from: `"NW Real Estate Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `Topic: ${topic || "(not provided)"}`,
      "",
      "Message:",
      message || "(no message)",
    ].join("\n"),
  });
}

module.exports = { sendContactEmail };
