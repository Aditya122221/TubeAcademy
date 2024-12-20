const express = require('express')
const router = express.Router()
const email_from_client = require('../Modal/email_from_client.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const adminUserData = require('../Modal/adminUserData.js')
const teacherUserData = require('../Modal/teacherUserData.js')
const studentUserData = require('../Modal/studentUserData.js')

const secretCode = "dadsfS@#@$#$#@$1351425431"

router.post('/', async (req, res) => {
    res.json("Server Running")
})

//---------------------------Signup or Register--------------------------------------

router.post('/signup', async (req, res) => {
    try {
        // Validate required fields
        const { fName, lName, pNumber, role, password, email, address } = req.body;
        if (!fName || !lName || !pNumber || !password || !role) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        // Check for existing user using findOne instead of find

        if (role === "admin") {
            const existingUser = await adminUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (99 - 10)) + 10

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new adminUserData({ Registration_ID, fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }
        else if (role === "Teacher") {
            const existingUser = await teacherUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (9999 - 1000)) + 1000

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new teacherUserData({ Registration_ID, fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }
        else {
            const existingUser = await studentUserData.findOne({ pNumber });

            if (existingUser) {
                return res.status(409).json({ status: false, message: "User with this phone number already exists" });
            }

            const Registration_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000

            // Hash password securely using bcrypt
            const hashPassword = await bcrypt.hash(password, 10);

            // Create and save new user using newUser.save()
            const newUser = new studentUserData({ Registration_ID, fName, lName, pNumber, role, email, address, password });
            await newUser.save();
        }

        return res.status(201).json({ status: true, message: "Registration Successful!" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

//------------------------------------Log In-----------------------------------------

router.post('/login', async (req, res) => {
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
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode, { expiresIn: '1hr' });

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
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode, { expiresIn: '1hr' });

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
            const token = jwt.sign({ id: user._id, role: user.role }, secretCode, { expiresIn: '1hr' });

            const roleAction = user.role;

            // Send successful login response
            return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

//------------------------------------Profile-------------------------------------------

router.post('/profile', async (req, res) => {
    try {

        const token = req.headers?.authorization?.split(' ')[1];
        const role = req.headers?.role;

        if (role === "admin") {

            if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

            jwt.verify(token, secretCode, async (err, decode) => {
                const user = await adminUserData.findById(decode?.id)
                if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
                const userData = {
                    id: user.id,
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
        else if (role === "Teacher") {

            if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

            jwt.verify(token, secretCode, async (err, decode) => {
                const user = await teacherUserData.findById(decode?.id)
                if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
                const userData = {
                    id: user.id,
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

router.post('/email', cors(), async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const date = Date.now()
        const time = 50;
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

router.post('/update', async (req, res) => {
    try {
        const { fName, lName, pNumber, uEmail, uAddress, urole } = req.body
        if (urole === "admin") {
            const updateData = await adminUserData.updateOne({ pNumber: pNumber }, { $set: { fName: fName, lName: lName, email: uEmail, address: uAddress } })
            if (!updateData) return res.status(404).json({ status: false, message: "Updating Error", error: err.message })
            return res.status(201).json({ status: true, message: uEmail })
        }
        else if (urole === "Teacher") {
            const updateData = await teacherUserData.updateOne({ pNumber: pNumber }, { $set: { fName: fName, lName: lName, email: uEmail, address: uAddress } })
            if (!updateData) return res.status(404).json({ status: false, message: "Updating Error", error: err.message })
            return res.status(201).json({ status: true, message: uEmail })
        }
        else {
            const updateData = await studentUserData.updateOne({ pNumber: pNumber }, { $set: { fName: fName, lName: lName, email: uEmail, address: uAddress } })
            if (!updateData) return res.status(404).json({ status: false, message: "Updating Error", error: err.message })
            return res.status(201).json({ status: true, message: uEmail })
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//--------------------------------User Check-----------------------------------------

router.post('/usercheck', async (req, res) => {
    try {
        const { fpnumber, regis, frole } = req.body
        let r = Number(regis);
        // console.log("-----------------User Check--------------------------")
        if (frole === "fadmin") {
            const user = await adminUserData.findOne({ pNumber: fpnumber })
            if (!user) {
                // console.log("User does not exists")
                return res.status(404).json({ status: false, data: "User does not exists" })
            }
            else {
                if (user.Registration_ID !== r) {
                    // console.log("Registration Id is incorrect")
                    return res.status(404).json({ status: false, data: "Registration Id is incorrect" })
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
                    pnumber: user?.pNumber,
                    role: user?.role
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

router.post('/passwordupdate', async (req, res) => {
    try {
        const { pnumber, newpassword, urole } = req.body
        console.log("Update Password")
        console.log(req.body)
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

//---------------------------------Exporting-----------------------------------------

module.exports = router;