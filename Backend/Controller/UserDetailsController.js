import email_from_client from "../Modal/email_from_client.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

export const TeacherDetail = async (req, res) => {
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
}

export const StudentDetail = async (req, res) => {
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
}

export const QueryDetail = async (req, res) => {
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
}