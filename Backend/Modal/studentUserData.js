import mongoose from 'mongoose'

const studentUserDataSchema = new mongoose.Schema({
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
    },
    watchHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "uploadVideo"
        }
    ],
}, { timestamps: true })

const studentUserData = mongoose.model("studentUserData", studentUserDataSchema)

export default studentUserData