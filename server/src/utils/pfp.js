const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const getPfp = async (id) => {
  const filePath = `/assets/img/pfp/${id}.jpg`;
  return filePath;
};

module.exports = { getPfp };
