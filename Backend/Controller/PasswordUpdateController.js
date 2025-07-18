import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const PasswordUpdate = async (req, res) => {
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
}

export default PasswordUpdate