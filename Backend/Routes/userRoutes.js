const express = require('express')
const router = express.Router()
const userSchema = require('../Modal/mongoModal.js')
const email_from_client = require('../Modal/email_from_client.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const secretCode = "dadsfS@#@$#$#@$1351425431"

router.post('/', async (req, res) => {
    res.json("Server Running")
})

//---------------------------Signup or Register--------------------------------------

router.post('/signup', async (req, res) => {
    try {
        // Validate required fields
        const { fName, lName, pNumber, role, password, email, address } = req.body;
        if (!fName || !lName || !pNumber || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        // Check for existing user using findOne instead of find
        const existingUser = await userSchema.findOne({ pNumber });

        if (existingUser) {
            return res.status(409).json({ status: false, message: "User with this phone number already exists" });
        }

        // Hash password securely using bcrypt
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save new user using newUser.save()
        const newUser = new userSchema({ fName, lName, pNumber, role, email, address, password });
        await newUser.save();

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
        const { pNumber, password } = req.body;
        if (!pNumber || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        // Find user by pNumber
        const user = await userSchema.findOne({ pNumber });

        // Check user existence and password validity
        if (!user || !user.password || !(password === user.password)) {
            return res.status(401).json({ status: false, message: "Invalid credentials" });
        }

        // Generate JWT token with appropriate claims
        const token = jwt.sign({ id: user._id, role: user.role }, secretCode, { expiresIn: '1hr' });

        const roleAction = user.role;

        // Send successful login response
        return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
});

//------------------------------------Profile-------------------------------------------

router.post('/profile', async (req, res) => {
    try {

        const token = req.headers?.authorization?.split(' ')[1];

        if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

        jwt.verify(token, secretCode, async (err, decode) => {
            const user = await userSchema.findById(decode?.id)
            if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
            const userData = {
                id: user.id,
                fName: user?.fName,
                lName: user?.lName,
                pNumber: user?.pNumber,
                email: user?.email,
                address: user?.address
            }
            return res.status(201).json({ status: true, message: "Profile Data", data: userData })
        })
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
        const { fName, lName, pNumber, uEmail, uAddress } = req.body
        const updateData = await userSchema.updateOne({ pNumber: pNumber }, { $set: { fName: fName, lName: lName, email: uEmail, address: uAddress } })
        console.log(updateData)
        if (!updateData) return res.status(404).json({ status: false, message: "Updating Error", error: err.message })
        return res.status(201).json({ status: true, message: uEmail })
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//--------------------------------User Check-----------------------------------------

router.post('/usercheck', async (req, res) => {
    try {
        const { fpnumber } = req.body
        console.log(fpnumber)
        const user = await userSchema.findOne({ pNumber: fpnumber })
        if (!user) return res.status(404).json({ status: false, message: "User does not exists" })
        return res.status(201).json({ status: true, message: "User exists" })
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//------------------------------Password Update--------------------------------------

router.post('/passwordupdate', async (req, res) => {
    try {
        const { pnumber, newpassword } = req.body
        const hashPassword = await bcrypt.hash(newpassword, 10);
        const upPas = await userSchema.updateOne({ pNumber: pnumber }, { $set: { password: hashPassword } })
        if (!upPas) return res.status(404).json({ status: false, message: "Password not updated" })

        return res.status(201).json({ status: true, message: "Password Updated" })

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//---------------------------------Exporting-----------------------------------------

module.exports = router;