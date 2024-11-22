const mongoose = require('mongoose')

const email_from_client = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model("email_from_client", email_from_client)