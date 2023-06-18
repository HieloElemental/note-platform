const express = require("express");
const router = express.Router();
const service = require("./../models/admins");

/* Read All Admins */
const list = (req, res) => {
  service
    .list()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err).json({ err }));
};

router.get("/all", list);

module.exports = router;
