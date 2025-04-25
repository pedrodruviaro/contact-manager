require("dotenv").config()
const express = require("express")
const router = require("./routes/contact.routes")
const errorHandler = require("./middlewares/error.middleware")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api/contacts", router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
