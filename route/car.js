const express = require("express");
const router = express.Router();
const carController = require("../controller/car");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(["user", "admin", "superAdmin"]), carController.getAllCar)
  .post(authMiddleware(["admin", "superAdmin"]), carController.createCar);

router
  .route("/:id")
  .get(authMiddleware(["user", "admin", "superAdmin"]), carController.getCar)
  .put(authMiddleware(["admin", "superAdmin"]), carController.updateCar)
  .delete(authMiddleware(["admin", "superAdmin"]), carController.deleteCar);

module.exports = router;
