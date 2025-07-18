import email_from_client from "../Modal/email_from_client.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const StaffDetail = async (req, res) => {
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
}

export default StaffDetail