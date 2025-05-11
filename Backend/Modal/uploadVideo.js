import mongoose from 'mongoose'
import mongooseAggregat from 'mongoose-aggregate-paginate-v2'

const uploadVideoSchema = new mongoose.Schema(
    {
        Video_ID: {
          type: Number  
        },
        Registration_ID: {
            type: Number
        },
        thumbnail: {
            type: String
        },
        thumbnailID: {
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
        video: {
            type: String
        },
        videoID: {
            type: String
        },
        views: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

uploadVideoSchema.plugin(mongooseAggregat)

const uploadVideo = mongoose.model("uploadVideo", uploadVideoSchema)

export default uploadVideo