const express = require("express");
const router = express.Router();
const { register, login, profile, addAdmin } = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  authMiddleware(["user", "admin", "superAdmin"]),
  profile
);
router.post("/addAdmin", authMiddleware(["superAdmin"]), addAdmin);
module.exports = router;
