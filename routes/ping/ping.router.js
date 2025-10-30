const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is awake!" });
});

module.exports = router;
