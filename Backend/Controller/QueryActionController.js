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

export const ReplyQuery = async (req, res) => {
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
}

export const GetAllQuery = async (req, res) => {
	try {
		const queryData = await email_from_client.find()
		return res.status(200).json({ data: queryData })
	} catch (err) {
		return res
			.status(404)
			.json({ message: "Fetching data error from server side" })
	}
}