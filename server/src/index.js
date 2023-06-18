const dotenv = require("dotenv").config();
const express = require("express");
const admins = require("./routes/admins");

const app = express();
app.use(express.json());

app.use("/admins", admins);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
