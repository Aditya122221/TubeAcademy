import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const UserCheck = async (req, res) => {
    try {
        const { fpnumber, regis, frole } = req.body

        let modelSchema

        if (frole === "admin") modelSchema = adminUserData
        else if (frole === "Teacher") modelSchema = teacherUserData
        else modelSchema = studentUserData

        const user = await modelSchema.findOne({ Registration_ID: regis })

        if (!user) {
            return res
                .status(215)
                .json({ status: false, message: "User does not exists" })
        } else if (user.pNumber !== fpnumber) {
            res.status(215).json({ status: false, message: "Phone number is incorrect" })
        } else {
            const userData = {
                regis: user?.Registration_ID,
                frole: user?.role,
            }
            return res.status(200).json({ status: true, data: userData })
        }
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default UserCheck