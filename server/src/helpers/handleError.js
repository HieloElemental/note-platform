const handleBadRequest = (res, errorMessage) => {
  return res.status(400).json({ error: errorMessage });
};

const handleUnauthorized = (res, errorMessage) => {
  return res.status(401).json({ error: errorMessage });
};

const handleServerError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { handleBadRequest, handleUnauthorized, handleServerError };
