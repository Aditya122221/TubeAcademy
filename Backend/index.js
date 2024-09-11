const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')

const app = express()

app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/', userRoutes)

mongoose.connect('mongodb://localhost:27017/BestChannel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log("Failed to connect to Database", err))

app.listen(3000, () => {
    console.log("Server running")
})