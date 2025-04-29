const express = require("express")
const router = express.Router()
const {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
} = require("../controllers/contact.controller")
const validateToken = require("../middlewares/validate-token.middleware")

router.use(validateToken) // used in all routes
router.get("/", getContacts)
router.get("/:id", getContact)
router.post("/", createContact)
router.put("/:id", updateContact)
router.delete("/:id", deleteContact)

module.exports = router
