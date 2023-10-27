const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));
app.use("/", routes);

module.exports = { app };
