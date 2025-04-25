const asynHandler = require("express-async-handler")
const Contact = require("../models/contact.model")

// @description Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asynHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.json({ contacts })
})

// @description Get singe contact
// @route GET /api/contacts/:id
// @access public
const getContact = asynHandler(async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  res.json({ contact })
})

// @description create conatct
// @route POST /api/contacts
// @access public
const createContact = asynHandler(async (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    res.status(400)
    throw new Error("All field are required")
  }

  const contact = await Contact.create({ name, email, phone })

  res.status(201).json({ contact })
})

// @description update a conatct
// @route PUT /api/contacts/:id
// @access public
const updateContact = asynHandler(async (req, res) => {
  const { id } = req.params

  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(201).json({ contact: updatedContact })
})

// @description delete conatct
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asynHandler(async (req, res) => {
  const { id } = req.params

  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  await Contact.deleteOne({ _id: id })

  res.status(200).json({ contact })
})

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
}
