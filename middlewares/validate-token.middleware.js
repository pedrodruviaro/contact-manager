const asynHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asynHandler((req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error("User is not authorized")
      }

      req.user = decoded.user
      next()
    })

    if (!token) {
      res.status(401)
      throw new Error("User is not authorized or token missing on request")
    }
  }
})

module.exports = validateToken
