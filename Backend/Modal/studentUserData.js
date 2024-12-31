const mongoose = require('mongoose')

const studentUserData = new mongoose.Schema({
    Registration_ID: {
        type: Number
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
    }
}, { timestamp: true })

module.exports = mongoose.model("studentUserData", studentUserData)