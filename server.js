require("dotenv").config()
const express = require("express")
const router = require("./routes/contact.routes")

const app = express()
const PORT = process.env.PORT

app.use("/api/contacts", router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
