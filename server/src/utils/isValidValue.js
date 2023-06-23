const isValidString = (str) => {
  if (!str || typeof str !== "string") {
    return false;
  }
  const normalCharactersPattern = /^[a-zA-Z0-9\sñÑ]+$/;
  return normalCharactersPattern.test(str);
};

module.exports = {
  isValidString,
};
