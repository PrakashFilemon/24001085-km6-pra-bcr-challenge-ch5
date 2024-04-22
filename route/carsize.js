const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const carsizeController = require("../controller/carsize");

router
  .route("/")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    carsizeController.getAllCarsize
  )
  .post(
    authMiddleware(["admin", "superAdmin"]),
    carsizeController.createCarsize
  );

router
  .route("/:id")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    carsizeController.getCarsize
  )
  .put(authMiddleware(["admin", "superAdmin"]), carsizeController.updateCarsize)
  .delete(
    authMiddleware(["admin", "superAdmin"]),
    carsizeController.deleteCarsize
  );

module.exports = router;
