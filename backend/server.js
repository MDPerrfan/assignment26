import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import categoryRoutes from './routes/categories.js'
import connectDB from './config/mongodb.js'

// Load environment variables
dotenv.config()

// Debug: Check if environment variables are loaded
console.log('Environment Variables:', {
    JWT_SECRET: process.env.JWT_SECRET ? 'Present' : 'Missing',
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI ? 'Present' : 'Missing'
})

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, {
        body: req.body,
        headers: req.headers
    })
    next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/categories', categoryRoutes)

// Connect to MongoDB
connectDB()

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
        message: 'Something went wrong!',
        details: err.message
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})