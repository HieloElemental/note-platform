const express = require("express");
const login = require("./routes/login");
const admins = require("./routes/admins");

const app = express();
app.use(express.json());

app.use("/login", login);
app.use("/admins", admins);

module.exports = { app };
