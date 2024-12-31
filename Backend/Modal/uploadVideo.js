const mongoose = require('mongoose')


const uploadVideo = new mongoose.Schema(
    {
        Registration_ID: {
            type: mongoose.Schema.Types.Registration_ID,
            ref: 'teacherUserData'
        },
        thumbnail: {
            type: String
        },
        title: {
            type: String
        },
        subjectName: {
            type: String
        },
        forClass: {
            type: String
        },
        teacherName: {
            type: String
        },
        video: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("uploadVideo", uploadVideo)