import express from "express"
const router = express.Router()
import jwt from "jsonwebtoken"
import cors from "cors"
import upload from "./multer.js"
import teacherUserData from "../Modal/teacherUserData.js"
import uploadVideo from "../Modal/uploadVideo.js"

import Signup from "../Controller/SignupController.js"
import Login from "../Controller/LoginController.js"
import Profile from "../Controller/ProfileController.js"
import EmailSend from "../Controller/EmailSendController.js"
import ProfileUpdate from "../Controller/ProfileUpdateController.js"
import UserCheck from "../Controller/UserCheckController.js"
import PasswordUpdate from "../Controller/PasswordUpdateController.js"
import { QueryDetail, StudentDetail, TeacherDetail } from "../Controller/UserDetailsController.js"
import { DeleteVideo, EditVideo, UploadVideo } from "../Controller/VideoActionController.js"
import { ClassEleven, ClassNine, ClassTen, ClassTwelve } from "../Controller/VideoFetchController.js"
import StaffDetail from "../Controller/StaffDetailController.js"
import { GetAllQuery, ReplyQuery } from "../Controller/QueryActionController.js"

router.post("/api/signup", Signup)
router.post("/api/login", Login)
router.post("/api/profile", Profile)
router.post("/api/email", cors(), EmailSend)
router.post("/api/update", upload.single("avatar"), ProfileUpdate)
router.post("/api/usercheck", UserCheck)
router.post("/api/passwordupdate", PasswordUpdate)
router.post("/api/teacherDetails", TeacherDetail)
router.post("/api/studentDetails", StudentDetail)
router.post("/api/queryDetails", QueryDetail)
router.post("/api/uploadVideo", upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "video", maxCount: 1 }]), UploadVideo)
router.post("/api/classNine", ClassNine)
router.post("/api/classTen", ClassTen)
router.post("/api/classEleven", ClassEleven)
router.post("/api/classTwelve", ClassTwelve)
router.post("/api/deletevideo", DeleteVideo)
router.post("/api/editvideo", upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "video", maxCount: 1 }]), EditVideo)
router.post("/api/staff", StaffDetail)
router.post("/api/replyingquery", ReplyQuery)
router.post("/api/queryAll", GetAllQuery)

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

//---------------------------------Exporting-----------------------------------------

export default router
