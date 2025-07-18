import jwt from "jsonwebtoken"
import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const Profile = async (req, res) => {
    try {
		const token = req.headers?.authorization?.split(" ")[1]
		const role = req.headers?.role

		if (!token)
			return res
				.status(404)
				.json({ status: false, message: "Access Denied" })

		let modelSchema

		if (role === "admin") modelSchema = adminUserData
		else if (role === "Teacher") modelSchema = teacherUserData
		else modelSchema = studentUserData

		jwt.verify(token, secretCode, async (err, decode) => {
			const user = await modelSchema.findById(decode?.id)
			if (!user)
				return res
					.status(404)
					.json({ status: false, message: "Invalid Token" })
			const userData = {
				id: user.id,
				Registration_ID: user?.Registration_ID,
				avatar: user?.avatar,
				fName: user?.fName,
				lName: user?.lName,
				pNumber: user?.pNumber,
				email: user?.email,
				address: user?.address,
			}

			return res
				.status(201)
				.json({ status: true, message: "Profile Data", data: userData })
		})
	} catch (err) {
		return res.status(404).json({
			status: false,
			message: "Something went wrong",
			error: err.message,
		})
	}
}

export default Profile