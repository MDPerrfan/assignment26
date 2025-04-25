import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import auth from '../middleware/auth.js'
import dotenv from 'dotenv'

const router = express.Router()

// Debug: Check JWT_SECRET at route initialization
console.log('Auth Routes - JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing')

// Register
router.post('/register', async(req, res) => {
    try {
        console.log('Registration request body:', req.body);
        const { name, email, password } = req.body

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                details: {
                    name: !name ? 'Name is required' : null,
                    email: !email ? 'Email is required' : null,
                    password: !password ? 'Password is required' : null
                }
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' })
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Create new user
        const user = new User({ name, email, password })
        await user.save()

        // Check if JWT_SECRET exists before signing
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined. Environment variables:', process.env);
            return res.status(500).json({
                message: 'Server configuration error',
                details: 'JWT_SECRET is not defined in environment variables'
            });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // Remove password from user object before sending response
        const userResponse = user.toObject()
        delete userResponse.password

        res.status(201).json({ user: userResponse, token })
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Registration failed',
            details: error.message
        })
    }
})

// Login
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Check password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Check if JWT_SECRET exists before signing
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // Remove password from user object before sending response
        const userResponse = user.toObject()
        delete userResponse.password

        res.json({ user: userResponse, token })
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            message: 'Login failed',
            details: error.message
        })
    }
})

// Get current user
router.get('/me', auth, async(req, res) => {
    try {
        // Remove password from user object before sending response
        const userResponse = req.user.toObject()
        delete userResponse.password
        res.json(userResponse)
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(400).json({
            message: 'Failed to get user data',
            details: error.message
        })
    }
})

export default router