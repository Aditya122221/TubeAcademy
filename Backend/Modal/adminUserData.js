import mongoose from 'mongoose'

const adminUserDataSchema = new mongoose.Schema({
    Registration_ID: {
        type: Number
    },
    avatar: {
        type: String
    },
    avatarID: {
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
    }
}, { timestamps: true })

const adminUserData = mongoose.model("adminUserData", adminUserDataSchema)

export default adminUserData