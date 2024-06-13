const express = require("express");
const postModel = require("../models/post.model");
const postController = require("../controllers/post.controller");
const router = express.Router();
const logger = require("../middlewaress/logger");
const authMiddleware = require("../middlewaress/auth.middleware");
const authorMiddleware = require("../middlewaress/author.middleware");

router.get("/get", postController.getAll);
router.get("/get/one/:id", postController.getOne);
router.post("/create", authMiddleware, postController.create);

router.delete("/delete/:id", authMiddleware, authorMiddleware, postController.delete);
router.put("/edit/:id", authMiddleware, authorMiddleware, postController.edit);

module.exports = router;
