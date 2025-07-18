import express from "express"
const router = express.Router()
import { v2 as cloudinary } from "cloudinary"
import email_from_client from "../Modal/email_from_client.js"
import jwt from "jsonwebtoken"
import cors from "cors"
import upload from "./multer.js"
import uploadOnCloudinary from "./cloudinary.js"
import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"
import uploadVideo from "../Modal/uploadVideo.js"
import Signup from "../Controller/SignupController.js"
import Login from "../Controller/LoginController.js"
import Profile from "../Controller/ProfileController.js"
import EmailSend from "../Controller/EmailSendController.js"
import ProfileUpdate from "../Controller/ProfileUpdateController.js"
import UserCheck from "../Controller/UserCheckController.js"

const secretCode = process.env.ACCESS_TOKEN

router.post("/api/signup", Signup)
router.post("/api/login", Login)
router.post("/api/profile", Profile)
router.post("/api/email", cors(), EmailSend)
router.post("/api/update", upload.single("avatar"), ProfileUpdate)
router.post("/api/usercheck", UserCheck)

//------------------------------Password Update--------------------------------------

router.post("/api/passwordupdate", async (req, res) => {
	try {
		const { regis, newpassword, urole } = req.body
		console.log(req.body)
		// const hashPassword = await bcrypt.hash(newpassword, 10);

		let modelSchema

		if (urole === "admin") modelSchema = adminUserData
		else if (urole === "Teacher") modelSchema = teacherUserData
		else modelSchema = studentUserData

		const upPas = await modelSchema.updateOne(
			{ Registration_ID: regis },
			{ $set: { password: newpassword } }
		)
		if (!upPas)
			return res
				.status(404)
				.json({ status: false, message: "Password not updated" })
		return res
			.status(201)
			.json({ status: true, message: "Password Updated" })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong",
			error: err.message,
		})
	}
})

//-------------------------Details Fetching for Admin--------------------------------

router.post("/api/teacherDetails", async (req, res) => {
	try {
		const teacherData = await teacherUserData.find()
		return res.status(201).json({ status: true, data: teacherData })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong",
			error: err.message,
		})
	}
})

router.post("/api/studentDetails", async (req, res) => {
	try {
		const studentData = await studentUserData.find()
		return res.status(201).json({ status: true, data: studentData })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong",
			error: err.message,
		})
	}
})

router.post("/api/queryDetails", async (req, res) => {
	try {
		const { Registration_ID } = req.body
		const personalQuery = await email_from_client.find({ Registration_ID })
		return res.status(201).json({ status: true, data: personalQuery })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong",
			error: err.message,
		})
	}
})

//-------------------------------Upload Video----------------------------------------

router.post(
	"/api/uploadVideo",
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "video", maxCount: 1 },
	]),
	async (req, res) => {
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
)

//--------------------------------Videos Fetching------------------------------------

router.post("/api/classNine", async (req, res) => {
	try {
		const classNineVideos = await uploadVideo.find({ forClass: "IX" })
		return res.status(201).json({ status: true, data: classNineVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Nine Videos",
			error: err.message,
		})
	}
})

router.post("/api/classTen", async (req, res) => {
	try {
		const classTenVideos = await uploadVideo.find({ forClass: "X" })
		return res.status(201).json({ status: true, data: classTenVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Ten Videos",
			error: err.message,
		})
	}
})

router.post("/api/classEleven", async (req, res) => {
	try {
		const classElevenVideos = await uploadVideo.find({ forClass: "XI" })
		return res.status(201).json({ status: true, data: classElevenVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Eleven Videos",
			error: err.message,
		})
	}
})

router.post("/api/classTwelve", async (req, res) => {
	try {
		const classTwelveVideos = await uploadVideo.find({ forClass: "XII" })
		return res.status(201).json({ status: true, data: classTwelveVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Twelve Videos",
			error: err.message,
		})
	}
})

//--------------------------------Image Slider---------------------------------------

router.post("/api/slider", async (req, res) => {
	try {
		const sliderImages = await uploadVideo.find()
		const selectedImages = sliderImages.slice(0, 4)
		// console.log(selectedImages[0].thumbnail);
		return res.status(201).json({ status: true, data: selectedImages })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message:
				"Something went wrong while fetching Slider Images from Backend",
			error: err.message,
		})
	}
})

//--------------------------------Fetch All Video------------------------------------

router.post("/api/allvideo", async (req, res) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1]
		if (!token)
			return res
				.status(404)
				.json({ status: false, message: "Access Denied" })

		jwt.verify(token, secretCode, async (err, decode) => {
			const user = await teacherUserData.findById(decode?.id)
			if (!user)
				return res
					.status(404)
					.json({ status: false, message: "Invalid Token" })
			
      const RegID = user.Registration_ID
			const teacherVideo = await uploadVideo.find({
				Registration_ID: RegID,
			})
			return res.status(201).json({ status: true, data: teacherVideo })
		})
	} catch (err) {
		return res.status(500).json({
			status: false,
			message:
				"Something went wrong while fetching all videos from Backend",
		})
	}
})

//---------------------------------Delete Videos-------------------------------------

router.post("/api/deletevideo", async (req, res) => {
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
})

//-------------------------------Edit Videos-----------------------------------------

router.post(
	"/api/editvideo",
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "video", maxCount: 1 },
	]),
	async (req, res) => {
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

			return res.status(210).json({status: false, message: "Video updating failed"})
		} catch (err) {
			console.error("Edit video error:", err)
			return res.status(500).json({
				status: false,
				message: "Something went wrong while updating from backend",
			})
		}
	}
)

//---------------------------------Staff Details------------------------------------

router.post("/api/staff", async (req, res) => {
	try {
		const teacherData = await teacherUserData.find()

		const studentData = await studentUserData.find()

		const statusQuery = await email_from_client.find({ status: "pending" })

		const allStaff = { teacherData, studentData, statusQuery }

		return res.status(201).json({ status: true, data: allStaff })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message:
				"Something went wrong while fetching staff detail from server side",
		})
	}
})

//---------------------------------replying query-----------------------------------

router.post("/api/replyingquery", async (req, res) => {
	try {
		const { query_ID, replyMessage } = req.body

		if (!replyMessage) {
			return res.status(400)
		}

		const now = new Date()
		const formattedDate = now
			.toLocaleString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(",", "")

		const upQuery = await email_from_client.updateOne(
			{ query_ID },
			{
				$set: {
					replyMessage,
					resolveDate: formattedDate,
					status: "resolved",
				},
			}
		)

		if (!upQuery) {
			return res.status(400)
		}

		return res.status(200)
	} catch (err) {
		return res.status(500).send("Server side error", err)
	}
})

router.post("/api/queryAll", async (req, res) => {
	try {
		const queryData = await email_from_client.find()
		return res.status(200).json({ data: queryData })
	} catch (err) {
		return res
			.status(404)
			.json({ message: "Fetching data error from server side" })
	}
})

//---------------------------------Exporting-----------------------------------------

export default router
