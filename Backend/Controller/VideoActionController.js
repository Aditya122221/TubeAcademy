import uploadOnCloudinary from "../Routes/cloudinary.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"
import uploadVideo from "../Modal/uploadVideo.js"

export const UploadVideo = async (req, res) => {
    try {
        const { Registration_ID, VTitle, SubjectName, classIn } = req.body
        const thumbnail = req.files?.thumbnail?.[0]
        const video = req.files?.video?.[0]

        const thumbnailPath = thumbnail?.path
        const videoPath = video?.path

        const thumbnailStored = await uploadOnCloudinary(thumbnailPath)
        const videoStored = await uploadOnCloudinary(videoPath)

        const searchUser = await teacherUserData.findOne({
            Registration_ID,
        })
        const teacherName = searchUser?.fName + " " + searchUser?.lName

        let Video_ID =
            Math.floor(Math.random() * (999999 - 100000)) + 100000
        const eReg = await uploadVideo.findOne({ Video_ID })

        while (Video_ID === eReg) {
            Video_ID =
                Math.floor(Math.random() * (999999 - 100000)) + 100000
            eReg = await studentUserData.findOne({ Video_ID })
        }

        const newVideo = new uploadVideo({
            Video_ID: Video_ID,
            Registration_ID: Registration_ID,
            thumbnail: thumbnailStored?.secure_url,
            thumbnailID: thumbnailStored?.public_id,
            title: VTitle,
            subjectName: SubjectName,
            forClass: classIn,
            teacherName: teacherName,
            duration: videoStored?.duration,
            video: videoStored?.secure_url,
            videoID: videoStored?.public_id,
        })

        const isSave = await newVideo.save()

        searchUser.videosOwn.push(isSave._id)
        await searchUser.save()

        if (isSave) {
            return res.status(200).json({
                status: true,
                message: "Video Uploaded Successfully",
            })
        } else {
            return res
                .status(204)
                .json({ status: false, message: "Video not uploaded" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            status: false,
            message: "Server side",
            error: err.message,
        })
    }
}

export const DeleteVideo = async (req, res) => {
    try {
        const { Video_ID } = req.body
        const video = await uploadVideo.findOne({ Video_ID })

        if (!video) {
            return res
                .status(404)
                .json({ status: false, message: "Video Not Found" })
        }

        await Promise.all([
            cloudinary.uploader.destroy(video.thumbnailID, {
                resource_type: "image",
            }),
            cloudinary.uploader.destroy(video.videoID, {
                resource_type: "video",
            }),
        ])

        await uploadVideo.deleteOne({ Video_ID })

        return res
            .status(200)
            .json({ status: true, message: "Video Deleted Successfully" })
    } catch (err) {
        console.error("Delete error:", err)
        return res.status(500).json({
            status: false,
            message: "Something went wrong while deleting video from backend",
        })
    }
}

export const EditVideo = async (req, res) => {
    try {
        const { Video_ID, title, subjectName, forClass } = req.body
        const thumbnail = req.files?.thumbnail?.[0]
        const video = req.files?.video?.[0]

        const existing = await uploadVideo.findOne({ Video_ID })
        if (!existing) {
            return res
                .status(404)
                .json({ status: false, message: "Video Not Found" })
        }

        const [thumbnailStored, videoStored] = await Promise.all([
            thumbnail?.path ? uploadOnCloudinary(thumbnail.path) : null,
            video?.path ? uploadOnCloudinary(video.path) : null,
        ])

        if (thumbnailStored !== null) {
            await cloudinary.uploader.destroy(existing.thumbnailID, {
                resource_type: "image",
            })
        }
        if (videoStored !== null) {
            await cloudinary.uploader.destroy(existing.videoID, {
                resource_type: "video",
            })
        }

        // Update DB entry
        const updated = await uploadVideo.findOneAndUpdate(
            { Video_ID },
            {
                $set: {
                    title,
                    subjectName,
                    forClass,
                    thumbnail:
                        thumbnailStored?.secure_url || existing.thumbnail,
                    thumbnailID:
                        thumbnailStored?.public_id || existing.thumbnailID,
                    video: videoStored?.secure_url || existing.video,
                    videoID: videoStored?.public_id || existing.videoID,
                },
            },
            { new: true }
        )

        if (updated) {
            return res.status(200).json({
                status: true,
                message: "Video Updated Successfully",
                updatedVideo: updated,
            })
        }

        return res.status(210).json({ status: false, message: "Video updating failed" })
    } catch (err) {
        console.error("Edit video error:", err)
        return res.status(500).json({
            status: false,
            message: "Something went wrong while updating from backend",
        })
    }
}