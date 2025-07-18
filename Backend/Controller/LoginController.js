import jwt from "jsonwebtoken"
import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"
import bcrypt from "bcrypt"

const Login = async (req, res) => {
    try {
        // Validate required fields
        const { Reg_ID, password, role } = req.body
        if (!Reg_ID || !password || !role) {
            return res
                .status(210)
                .json({ status: false, message: "All fields are required" })
        }

        let modelSchema

        if (role === "admin") modelSchema = adminUserData
        else if (role === "Teacher") modelSchema = teacherUserData
        else modelSchema = studentUserData

        // Find user by pNumber
        const user = await modelSchema.findOne({ Registration_ID: Reg_ID })

        // Check user existence and password validity
        if (!user) {
            return res
                .status(215)
                .json({ status: false, message: "User does not exists" })
        } else if (user.password !== password) {
            return res.status(215).send({ status: false, message: "Password did not matched" })
        }

        // Generate JWT token with appropriate claims
        const token = jwt.sign({ id: user._id, role: user.role }, secretCode)
        const RegID = user.Registration_ID
        const roleAction = user.role

        // Send successful login response
        return res.status(200).json({
            status: true,
            message: "Login Successful!",
            token,
            roleAction,
            RegID,
        })
    } catch (err) {
        console.error(err) // Log the error for debugging
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default Login