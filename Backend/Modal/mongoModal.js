const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    pNumber: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model("userSchema", userSchema)