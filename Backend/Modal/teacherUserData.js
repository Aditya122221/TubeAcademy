import mongoose from 'mongoose'

const teacherUserDataSchema = new mongoose.Schema({
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
    videosOwn: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'uploadVideo'
        }
    ]
}, {timestamps: true})

const teacherUserData = mongoose.model("teacherUserData", teacherUserDataSchema)

export default teacherUserData