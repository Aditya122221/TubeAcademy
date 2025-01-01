import mongoose from 'mongoose'

const email_from_clientSchema = new mongoose.Schema({
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

const email_from_client = mongoose.model("email_from_client", email_from_clientSchema)

export default email_from_client