const express = require("express");
const qr = require("qr-image");
const { URL } = require("url");
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/qr", (req, res) => {
  const url = req.query.url;
  try {
    new URL(url);
  } catch (err) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  const qr_svg = qr.image(url, { type: "svg" });
  res.setHeader("Content-disposition", "attachment; filename=qr.svg");
  res.setHeader("Content-type", "image/svg+xml");
  qr_svg.pipe(res);
});

app.listen(3000, () => {
  console.log("QR code generator is running");
});
