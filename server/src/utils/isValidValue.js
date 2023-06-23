const isValidString = (str) => {
  const normalCharactersPattern = /^[a-zA-Z0-9\sñÑ]+$/;
  return normalCharactersPattern.test(str);
};
