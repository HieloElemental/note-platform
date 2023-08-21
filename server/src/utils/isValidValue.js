const isValidString = (str, canBeNull = false) => {
  if (canBeNull && !str) {
    return true;
  }

  return typeof str === "string" && /^[a-zA-Z0-9\sñÑ]+$/.test(str);
};

module.exports = {
  isValidString,
};
