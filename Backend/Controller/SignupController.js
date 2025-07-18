import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const Signup = async (req, res) => {
    try {
        const { fName, lName, pNumber, role, password, email, address } = req.body

        const roleConfigs = {
            admin: {
                model: adminUserData,
                regMin: 10,
                regMax: 99,
            },
            Teacher: {
                model: teacherUserData,
                regMin: 1000,
                regMax: 9999,
            },
            Student: {
                model: studentUserData,
                regMin: 100000,
                regMax: 999999,
            },
        }

        const config = roleConfigs[role]
        if (!config) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid role" })
        }

        const { model, regMin, regMax } = config

        const existingPhone = await model.findOne({ pNumber })
        const existingEmail = await model.findOne({ email })
        if (existingPhone || existingEmail) {
            return res.status(409).json({
                status: false,
                message: "User with this phone number already exists",
            })
        }

        // Generate unique Registration_ID
        let Registration_ID
        let isDuplicate = true
        while (isDuplicate) {
            Registration_ID =
                Math.floor(Math.random() * (regMax - regMin + 1)) + regMin
            isDuplicate = await model.findOne({ Registration_ID })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new model({
            Registration_ID,
            avatar: "",
            avatarID: "",
            fName,
            lName,
            pNumber,
            role,
            email,
            address,
            password,
        })

        await newUser.save()

        //-------------------------Sending Mail-----------------------------------

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_FROM,
                pass: process.env.APP_PASSWORD,
            },
        })

        // Email options
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: `Thank You for Joining TubeAcademy – ${Registration_ID}`,
            text: `Dear ${fName} ${lName},

Thank you for joining TubeAcademy! We’re thrilled to have you as part of our growing learning community.

Your registration has been successfully completed.
Registration Number: ${Registration_ID}
Password: ${password}

Please change the password before login!

Click here to visit: ${process.env.CORS_ORIGIN}

We look forward to supporting you on your learning journey. If you have any questions or need assistance getting started, feel free to reach out to us at any time.

Warm regards,
Team TubeAcademy
tubeacademy018@gmail.com`,
        }

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log("Error:", error)
            }
        })

        return res
            .status(201)
            .json({ status: true, message: "Registration Successful!" })
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default Signup