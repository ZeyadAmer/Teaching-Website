const express = require("express");

const {
  addAdministrator,
  addCorporate,
  addInstructor,
  refund,
  viewrefunds,
  markProblem,
  viewProblems,
  viewRequests,
  grantCourse,
  setPromotion,
} = require("../controllers/administrator");

const requireAuth = require("../middleware/adminAuth");
const router = express.Router();
router.use(requireAuth);

router.post("/addAdministrator", addAdministrator);
router.post("/addcorporate", addCorporate);
router.post("/addinstructor", addInstructor);
router.post("/refund", refund);
router.post("/markProblem", markProblem);
router.get("/viewrefunds", viewrefunds);
router.get("/viewProblems", viewProblems);
router.get("/viewRequests", viewRequests);
router.post("/grantCourse", grantCourse);
router.post("/setPromotion", setPromotion);

module.exports = router;
