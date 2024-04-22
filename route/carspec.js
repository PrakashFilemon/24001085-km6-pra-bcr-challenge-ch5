const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const carspecController = require("../controller/carspec");

router
  .route("/")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    carspecController.getAllSpec
  )
  .post(authMiddleware(["admin", "superAdmin"]), carspecController.createSpec);

router
  .route("/:id")
  .get(
    authMiddleware(["user", "admin", "superAdmin"]),
    carspecController.getSpec
  )
  .put(authMiddleware(["admin", "superAdmin"]), carspecController.updateSpec)
  .delete(
    authMiddleware(["admin", "superAdmin"]),
    carspecController.deleteSpec
  );

module.exports = router;
