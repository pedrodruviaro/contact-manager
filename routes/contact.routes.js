const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "get all contacts" })
})

router.get("/:id", (req, res) => {
  res.json({ message: "Get contact -> " + req.params.id })
})

router.post("/", (req, res) => {
  res.json({ message: "create contact" })
})

router.put("/:id", (req, res) => {
  res.json({ message: "Update contact -> " + req.params.id })
})

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete contact -> " + req.params.id })
})

module.exports = router
