require('dotenv').config({ path: './env' });
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./Routes/userRoutes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: "16kb" }))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use('/', userRoutes);

mongoose.connect('mongodb://localhost:27017/TubeAcademy')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log("Failed to connect to Database", err));

// (async () => {
//   try {
//     const c = await mongoose.connect("mongodb+srv://adityakumar:aditya123@tubeacademy.zn4s6.mongodb.net/TubeAcademy");
//     console.log(`Database connected to ${c.connection.host}`);
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// })();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})