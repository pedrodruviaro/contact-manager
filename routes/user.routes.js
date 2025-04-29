const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/user.controller")
const validateToken = require("../middlewares/validate-token.middleware")

router.get("/current", validateToken, currentUser)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router
