const express = require('express')
const router  = express.Router()
const Contact = require('../models/Contact')

// POST /api/contact — save message from form
router.post('/', async (req, res) => {
  try {
    console.log('📥 POST /api/contact received:', req.body)
    
    const { name, email, message } = req.body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      console.log('✗ Validation failed: Missing fields')
      return res.status(400).json({
        success: false,
        error: 'All fields are required.',
      })
    }

    const newContact = await Contact.create({ name, email, message })
    console.log('✓ Saved to MongoDB:', newContact._id)

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully!',
      data: {
        id:        newContact._id,
        name:      newContact.name,
        createdAt: newContact.createdAt,
      },
    })
  } catch (error) {
    console.error('✗ Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Server error. Please try again.',
    })
  }
})

// GET /api/contact — see all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      count:   messages.length,
      data:    messages,
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error.' })
  }
})

module.exports = router