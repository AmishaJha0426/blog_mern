const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const router = express.Router();
const { createComment, getPostComments } = require("../controllers/comment.controller.js");

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);


module.exports = router;