import express from 'express'
const router = express.Router()
import email_from_client from '../Modal/email_from_client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors';
import upload from './multer.js'
import uploadOnCloudinary from './cloudinary.js'
import adminUserData from '../Modal/adminUserData.js'
import teacherUserData from '../Modal/teacherUserData.js'
import studentUserData from '../Modal/studentUserData.js'

const secretCode = "Cgjk-3445DERmnhjkloi4526dddAZ-gjhKLKJHN"

router.post('/api', async (req, res) => {
    res.json("Server Running")
})

//---------------------------Signup or Register--------------------------------------

router.post('/api/signup', async (req, res) => {
    try {
        // Validate required fields
        const { fName, lName, pNumber, role, password, email, address } = req.body;

        // Check for existing user using findOne instead of find

        if (role === "admin") {
            const existingUser = await adminUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (99 - 10)) + 10
            const eReg = await adminUserData.findOne({ Registration_ID });

            while (Registration_ID === eReg) {
                Registration_ID = Math.floor(Math.random() * (99 - 10)) + 10
                eReg = await adminUserData.findOne({ Registration_ID });
            }

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new adminUserData({ Registration_ID, avatar: "", fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }
        else if (role === "Teacher") {
            const existingUser = await teacherUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (9999 - 1000)) + 1000
            const eReg = await teacherUserData.findOne({ Registration_ID });

            while (Registration_ID === eReg) {
                Registration_ID = Math.floor(Math.random() * (9999 - 1000)) + 1000
                eReg = await teacherUserData.findOne({ Registration_ID });
            }

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new teacherUserData({ Registration_ID, avatar: "", fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }
        else {
            const existingUser = await studentUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000
            const eReg = await studentUserData.findOne({ Registration_ID });

            while (Registration_ID === eReg) {
                Registration_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000
                eReg = await studentUserData.findOne({ Registration_ID });
            }

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new studentUserData({ Registration_ID, avatar: "", fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }

        return res.status(201).json({ status: true, message: "Registration Successful!" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

//------------------------------------Log In-----------------------------------------

router.post('/api/login', async (req, res) => {
    try {
        // Validate required fields
        const { pNumber, password, role } = req.body;
        if (!pNumber || !password || !role) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        if (role === "admin") {

            // Find user by pNumber
            const user = await adminUserData.findOne({ pNumber });

            // Check user existence and password validity
            if (!user || !user.password || !(password === user.password)) {
                return res.status(401).json({ status: false, message: "Invalid credentials" });
            }

            // Generate JWT token with appropriate claims
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode);

            const roleAction = user.role;

            // Send successful login response
            return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
        }
        else if (role === "Teacher") {
            // Find user by pNumber
            const user = await teacherUserData.findOne({ pNumber });

            // Check user existence and password validity
            if (!user || !user.password || !(password === user.password)) {
                return res.status(401).json({ status: false, message: "Invalid credentials" });
            }

            // Generate JWT token with appropriate claims
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode);

            const roleAction = user.role;

            // Send successful login response
            return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
        }
        else {
            // Find user by pNumber
            const user = await studentUserData.findOne({ pNumber });

            // Check user existence and password validity
            if (!user || !user.password || !(password === user.password)) {
                return res.status(401).json({ status: false, message: "Invalid credentials" });
            }

            // Generate JWT token with appropriate claims
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode);

            const roleAction = user.role;

            // Send successful login response
            return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

//---------------------------------Profile-------------------------------------------

router.post('/api/profile', async (req, res) => {
    try {

        const token = req.headers?.authorization?.split(' ')[1];
        const role = req.headers?.role;

        if (role === "admin") {

            if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

            jwt.verify(token, secretCode, async (err, decode) => {
                const user = await adminUserData.findById(decode?.id)
                console.log(user)
                if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
                const userData = {
                    id: user.id,
                    Registration_ID: user?.Registration_ID,
                    avatar: user?.avatar,
                    fName: user?.fName,
                    lName: user?.lName,
                    pNumber: user?.pNumber,
                    email: user?.email,
                    address: user?.address
                }

                return res.status(201).json({ status: true, message: "Profile Data", data: userData })
            })
        }
        else if (role === "Teacher") {

            if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

            jwt.verify(token, secretCode, async (err, decode) => {
                const user = await teacherUserData.findById(decode?.id)
                if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
                const userData = {
                    id: user.id,
                    avatar: user?.avatar,
                    Registration_ID: user?.Registration_ID,
                    fName: user?.fName,
                    lName: user?.lName,
                    pNumber: user?.pNumber,
                    email: user?.email,
                    address: user?.address
                }

                return res.status(201).json({ status: true, message: "Profile Data", data: userData })
            })
        }
        else {

            if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

            jwt.verify(token, secretCode, async (err, decode) => {
                const user = await studentUserData.findById(decode?.id)
                if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
                const userData = {
                    id: user.id,
                    Registration_ID: user?.Registration_ID,
                    avatar: user?.avatar,
                    fName: user?.fName,
                    lName: user?.lName,
                    pNumber: user?.pNumber,
                    email: user?.email,
                    address: user?.address
                }

                return res.status(201).json({ status: true, message: "Profile Data", data: userData })
            })
        }
    } catch (err) {
        return res.status(404).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//-------------------------------Email Sending-------------------------------------

router.post('/api/email', cors(), async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const date = Date.now()
        if (!name || !email || !message) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const newUser = new email_from_client({ fullName: name, email, message, date });
        await newUser.save();

        return res.status(201).json({ status: true, message: "Email sent!" });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//--------------------------------Update Data----------------------------------------

router.post('/api/update', upload.single('avatar'), async (req, res) => {
    try {
        const { fName, lName, pNumber, uEmail, uAddress, urole } = req.body
        const avatarLocalPath = req.file?.path;

        const isStored = await uploadOnCloudinary(avatarLocalPath)

        let updateModel;
        if (urole === "admin") updateModel = adminUserData;
        else if (urole === "Teacher") updateModel = teacherUserData;
        else updateModel = studentUserData;

        const updateData = await updateModel.updateOne(
            { pNumber: pNumber },
            {
                $set: {
                    avatar: isStored?.secure_url || "",
                    fName: fName,
                    lName: lName,
                    email: uEmail,
                    address: uAddress,
                },
            }
        );

        if (!updateData) {
            return res.status(404).json({ status: false, message: "Updating Error" });
        } else {
            return res.status(201).json({ status: true, message: "Data Updated" });
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//--------------------------------User Check-----------------------------------------

router.post('/api/usercheck', async (req, res) => {
    try {
        const { fpnumber, regis, frole } = req.body
        let r = Number(regis);
        if (frole === "fadmin") {
            const user = await adminUserData.findOne({ pNumber: fpnumber })
            if (!user) {
                // console.log("User does not exists")
                return res.status(404).json({ status: false, message: "User does not exists" })
            }
            else {
                if (user.Registration_ID !== r) {
                    // console.log("Registration Id is incorrect")
                    return res.status(404).json({ status: false, message: "Registration Id is incorrect" })
                }
                const userData = {
                    fpnumber: user?.pNumber,
                    frole: user?.role
                }
                return res.status(201).json({ status: true, data: userData })
            }
        }
        else if (frole === "fTeacher") {
            const user = await teacherUserData.findOne({ pNumber: fpnumber })
            if (!user) return res.status(404).json({ status: false, message: "User does not exists" })
            else {
                if (user.Registration_ID !== r) {
                    return res.status(404).json({ status: false, message: "Registration Id is incorrect" })
                }
                const userData = {
                    fpnumber: user?.pNumber,
                    frole: user?.role
                }
                return res.status(201).json({ status: true, data: userData })
            }
        }
        else {
            const user = await studentUserData.findOne({ pNumber: fpnumber })
            if (!user) return res.status(404).json({ status: false, message: "User does not exists" })
            else {
                if (user.Registration_ID !== r) return res.status(404).json({ status: false, message: "Registration Id is incorrect" })
                const userData = {
                    fpnumber: user?.pNumber,
                    frole: user?.role
                }
                return res.status(201).json({ status: true, data: userData })
            }
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//------------------------------Password Update--------------------------------------

router.post('/api/passwordupdate', async (req, res) => {
    try {
        const { pnumber, newpassword, urole } = req.body
        // const hashPassword = await bcrypt.hash(newpassword, 10);

        if (urole === "admin") {
            const upPas = await adminUserData.updateOne({ pNumber: pnumber }, { $set: { password: newpassword } })
            if (!upPas) return res.status(404).json({ status: false, message: "Password not updated" })
            return res.status(201).json({ status: true, message: "Password Updated" })
        }

        else if (urole === "Teacher") {
            const upPas = await teacherUserData.updateOne({ pNumber: pnumber }, { $set: { password: newpassword } })
            if (!upPas) return res.status(404).json({ status: false, message: "Password not updated" })
            return res.status(201).json({ status: true, message: "Password Updated" })
        }

        else {
            const upPas = await studentUserData.updateOne({ pNumber: pnumber }, { $set: { password: newpassword } })
            if (!upPas) return res.status(404).json({ status: false, message: "Password not updated" })
            return res.status(201).json({ status: true, message: "Password Updated" })
        }

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//-------------------------Details Fetching for Admin--------------------------------

router.post('/api/teacherDetails', async (req, res) => {
    try {
        const teacherData = await teacherUserData.find();
        return res.status(201).json({ status: true, data: teacherData })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

router.post('/api/studentDetails', async (req, res) => {
    try {
        const studentData = await studentUserData.find();
        return res.status(201).json({ status: true, data: studentData })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

router.post('/api/queryDetails', async (req, res) => {
    try {
        const Query = await email_from_client.find();
        return res.status(201).json({ status: true, data: Query })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//-------------------------------Upload Video----------------------------------------

router.post('/api/uploadVideo', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
]), async (req, res) => {
    try {
        const { VTitle, SubjectName, classIn } = req.body; // Text data from the request
        const thumbnail = req.files?.thumbnail?.[0]; // Thumbnail file
        const video = req.files?.video?.[0]; // Video file

        console.log('Request Body:', { VTitle, SubjectName, classIn });
        console.log('Thumbnail File:', thumbnail);
        console.log('Video File:', video);

        return res.status(201).json({ status: true, message: "Video Uploaded" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message });
    }
});

//---------------------------------Exporting-----------------------------------------

export default router;