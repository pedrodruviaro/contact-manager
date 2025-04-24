require("dotenv").config()
const express = require("express")

const app = express()
const PORT = process.env.PORT

app.get("/api/contacts", (req, res) => {
  res.status(200).json({ message: "Hello, Express!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
