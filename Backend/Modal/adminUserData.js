const mongoose = require('mongoose')

const adminUserData = new mongoose.Schema({
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
}, { timestamps: true })

module.exports = mongoose.model("adminUserData", adminUserData)