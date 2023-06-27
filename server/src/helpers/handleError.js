const httpError = (res, err) => {
  return res.status(500).json({ error: err.message || "something went wrong" });
};
