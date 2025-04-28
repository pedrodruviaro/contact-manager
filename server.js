require("dotenv").config()
const express = require("express")
const contactsRouter = require("./routes/contact.routes")
const usersRouter = require("./routes/user.routes")
const errorHandler = require("./middlewares/error.middleware")
const connectDb = require("./config/dbConnection")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api/contacts", contactsRouter)
app.use("/api/users", usersRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  connectDb()
  console.log(`Server running on port ${PORT}`)
})
