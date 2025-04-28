const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/user.controller")

router.get("/current", currentUser)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router
