const asynHandler = require("express-async-handler")
const User = require("../models/user.model")

// @description Register user
// @route POST /api/users/register
// @access public
const registerUser = asynHandler(async (req, res) => {
  res.send({ user: "register user" })
})

// @description Login user
// @route POST /api/users/login
// @access public
const loginUser = asynHandler(async (req, res) => {
  res.send({ user: "login user" })
})

// @description Get the current user
// @route GET /api/users/current
// @access private
const currentUser = asynHandler(async (req, res) => {
  res.send({ user: "current user" })
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
