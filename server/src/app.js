const express = require("express");
const admins = require("./routes/admins");

const app = express();
app.use(express.json());

app.use("/admins", admins);

module.exports = { app };
