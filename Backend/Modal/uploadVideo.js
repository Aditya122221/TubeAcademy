const mongoose = require('mongoose')
const mongooseAggregat = require('mongoose-aggregate-paginate-v2')

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
        duration: {
            type: Number
        },
        views: {
            type: Number,
            default: 0
        },
        video: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

uploadVideo.plugin(mongooseAggregat)

module.exports = mongoose.model("uploadVideo", uploadVideo)