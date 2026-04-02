const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()

const contactRoutes = require('./routes/contact')

const app  = express()
const PORT = process.env.PORT || 5000

console.log('🔧 Server starting...')
console.log('🌐 MONGO_URI:', process.env.MONGO_URI ? 'Configured ✓' : 'NOT SET ✗')

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
}))
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message)
    process.exit(1)
  })

app.get('/', (req, res) => {
  res.json({ status: 'Backend running ✓' })
})

app.use('/api/contact', contactRoutes)

app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`)
  console.log(`✓ CORS origins: http://localhost:5173, http://localhost:4173`)
})