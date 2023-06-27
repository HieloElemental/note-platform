const dotenv = require("dotenv").config();
const { app } = require("./src/app.js");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
