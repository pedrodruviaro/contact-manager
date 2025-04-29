const asynHandler = require("express-async-handler")
const Contact = require("../models/contact.model")

// @description Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asynHandler(async (req, res) => {
  const user = req.user
  const contacts = await Contact.find({ userId: user.id })
  res.json({ contacts })
})

// @description Get singe contact
// @route GET /api/contacts/:id
// @access private
const getContact = asynHandler(async (req, res) => {
  const { id } = req.params
  const user = req.user
  const contact = await Contact.findOne({ userId: user.id, _id: id })

  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  res.json({ contact })
})

// @description create conatct
// @route POST /api/contacts
// @access private
const createContact = asynHandler(async (req, res) => {
  const { name, email, phone } = req.body
  const user = req.user

  if (!name || !email || !phone) {
    res.status(400)
    throw new Error("All field are required")
  }

  const contact = await Contact.create({ name, email, phone, userId: user.id })

  res.status(201).json({ contact })
})

// @description update a conatct
// @route PUT /api/contacts/:id
// @access private
const updateContact = asynHandler(async (req, res) => {
  const { id } = req.params
  const user = req.user

  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  if (contact.userId.toString() !== user.id) {
    res.status(403)
    throw new Error("Dont have permission to update other user contact")
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(201).json({ contact: updatedContact })
})

// @description delete conatct
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asynHandler(async (req, res) => {
  const { id } = req.params
  const user = req.user

  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  if (contact.userId.toString() !== user.id) {
    res.status(403)
    throw new Error("Dont have permission to delete other user contact")
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
