const express = require("express");
const login = require("./routes/login");
const admins = require("./routes/admins");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (replace "*" with your frontend URL for production)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/login", login);
app.use("/admins", admins);

module.exports = { app };
