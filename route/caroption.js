const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const caroptionController = require("../controller/caroption");

router
  .route("/")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    caroptionController.getAllOption
  )
  .post(
    authMiddleware(["admin", "superAdmin"]),
    caroptionController.createOption
  );

router
  .route("/:id")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    caroptionController.getCarOption
  )
  .put(
    authMiddleware(["admin", "superAdmin"]),
    caroptionController.updateOption
  )
  .delete(
    authMiddleware(["admin", "superAdmin"]),
    caroptionController.deleteOption
  );

module.exports = router;
