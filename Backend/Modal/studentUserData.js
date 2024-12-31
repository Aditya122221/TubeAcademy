const mongoose = require('mongoose')

const studentUserData = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    avatar: {
        type: String
    },
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    pNumber: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    watchHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "uploadVideo"
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model("studentUserData", studentUserData)