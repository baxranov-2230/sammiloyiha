const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewaress/auth.middleware");
const authorMiddleware = require("../middlewaress/author.middleware");

const password = () => body("passsword").isLength({ min: 3, max: 5 }); // funksiya shaklda ishlatish

router.post(
  "/register",
  body("email").isEmail(), // routes ichida ishlatish
  // password(),
  authController.register
);
router.get("/activation/:id", authController.activation);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/get-users", authMiddleware, authController.getUser);

module.exports = router;
