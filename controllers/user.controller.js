const asynHandler = require("express-async-handler")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// @description Register user
// @route POST /api/users/register
// @access public
const registerUser = asynHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error("All fields are required")
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already registered")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  if (!newUser) {
    res.status(400)
    throw new Error("User data not valid")
  }

  res.status(201).json({
    user: {
      _id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    },
  })
})

// @description Login user
// @route POST /api/users/login
// @access public
const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("All fields are required")
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error("Email or password incorrect")
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    res.status(400)
    throw new Error("Email or password incorrect")
  }

  const token = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  )

  res.status(200).json({ token })
})

// @description Get the current user
// @route GET /api/users/current
// @access private
const currentUser = asynHandler(async (req, res) => {
  res.send(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
