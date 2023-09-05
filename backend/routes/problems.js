const express = require("express");

const { newProblem } = require("../controllers/problemController");

const router = express.Router();
router.post("/newProblem", newProblem);

module.exports = router;
