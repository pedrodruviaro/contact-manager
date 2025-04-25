// @description Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = (req, res) => {
  res.json({ message: "get all contacts" })
}

// @description Get singe contact
// @route GET /api/contacts/:id
// @access public
const getContact = (req, res) => {
  res.json({ message: "Get contact -> " + req.params.id })
}

// @description create conatct
// @route POST /api/contacts
// @access public
const createContact = (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    res.status(400)
    throw new Error("All field are required")
  }

  res.status(201).json({ message: "create contact" })
}

// @description update a conatct
// @route PUT /api/contacts/:id
// @access public
const updateContact = (req, res) => {
  res.json({ message: "Update contact -> " + req.params.id })
}

// @description delete conatct
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = (req, res) => {
  res.json({ message: "Delete contact -> " + req.params.id })
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
}
