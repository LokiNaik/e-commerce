const express = require('express')
const axios = require('axios')
const app = express()
const bcrypt = require('bcryptjs')
const hashedPassword = require('password-hash')
const connectToMongoDB = require('../dbConfig')
var user = express.Router()

user.post('/createUser', async (req, res) => {
    const saltRounds = 10
    const { email, password, name, mobile } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    console.log('hashedPassword', hashedPassword)
    const client = connectToMongoDB()
    try {
        const db = (await client).db()
        await db.collection('user').insertOne({ email: email, password: hashedPassword, name: name, mobile: mobile });
        res.send('user created!')
    } catch (error) {
        console.log('error', error)
        res.send('error in creating user')
    }
})

user.post('/login', async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    const client = connectToMongoDB()
    try {
        const db = (await client).db()
        const user = await db.collection('user').findOne({ email })
        const isPasswordMatch = await bcrypt.compare(pass, user.password)
        if (!isPasswordMatch) {
            res.status(401).json("Password do not match")
        } else {
            res.status(200).json('Logged in')
        }
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = user
