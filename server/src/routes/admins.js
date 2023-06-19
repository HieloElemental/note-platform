const express = require("express");
const router = express.Router();
const service = require("./../models/admins");

/* Read All Admins */
const list = async (req, res) => {
  try {
    const adminList = await service.list();
    res.status(200).json(adminList);
  } catch (error) {
    res.status(404).json({ error });
  }
};

router.get("/all", list);

module.exports = router;
