const mongoose = require('mongoose')

const teacherUserData = new mongoose.Schema({
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
})

module.exports = mongoose.model("teacherUserData", teacherUserData)