const express = require("express");

const {
  signUp,
  logout,
  getUsers,
  loginIndividualTrainee,
  loginCorporateTrainee,
  logininstructor,
  activeUser,
  loginAdmin,
} = require("../controllers/UserLogger");

const router = express.Router();

router.post("/signup", signUp);
router.post("/loginIndividualTrainee", loginIndividualTrainee);
router.post("/loginCorporateTrainee", loginCorporateTrainee);
router.post("/logininstructor", logininstructor);
router.get("/logout", logout);
router.get("/users", getUsers);
router.get("/activeUser", activeUser);
router.post("/loginAdmin", loginAdmin);
module.exports = router;
