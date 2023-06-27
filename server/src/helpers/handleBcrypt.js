const bcrypt = require("bcryptjs");

const encrypt = async (plainText) => {
  const hash = await bcrypt.hash(plainText, 10);
  return hash;
};

const compare = async (plainText, hashText) => {
  return await bcrypt.compare(plainText, hashText);
};

module.exports = {
  encrypt,
  compare,
};
