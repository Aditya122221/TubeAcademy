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
import uploadVideo from '../Modal/uploadVideo.js'

const secretCode = process.env.ACCESS_TOKEN;

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

            let Registration_ID = Math.floor(Math.random() * (99 - 10)) + 10
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

            let Registration_ID = Math.floor(Math.random() * (9999 - 1000)) + 1000
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

            let Registration_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000
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
        const { Reg_ID, password, role } = req.body;
        if (!Reg_ID || !password || !role) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        let modelSchema;

        if (role === "admin") modelSchema = adminUserData;
        else if (role === "Teacher") modelSchema = teacherUserData;
        else modelSchema = studentUserData;

        // Find user by pNumber
        const user = await modelSchema.findOne({ Registration_ID: Reg_ID });

        // Check user existence and password validity
        if (!user || !user.password || !(password === user.password)) {
            return res.status(401).json({ status: false, message: "Invalid credentials" });
        }

        // Generate JWT token with appropriate claims
        const token = jwt.sign({ id: user._id, role: user.role }, secretCode);

        const roleAction = user.role;

        // Send successful login response
        return res.status(200).json({ status: true, message: "Login Successful!", token, roleAction });
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

        if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

        let modelSchema;

        if (role === "admin") modelSchema = adminUserData;
        else if (role === "Teacher") modelSchema = teacherUserData;
        else modelSchema = studentUserData;

        jwt.verify(token, secretCode, async (err, decode) => {
            const user = await modelSchema.findById(decode?.id)
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
                    avatar: isStored?.secure_url,
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

        let modelSchema;

        if (frole === "fadmin") modelSchema = adminUserData;
        else if (frole === "fTeacher") modelSchema = teacherUserData;
        else modelSchema = studentUserData;

        const user = await modelSchema.findOne({ 
            $and: [
              { Registration_ID: regis }, 
              { pNumber: fpnumber }
            ]
          });
          
        if (!user) {
            return res.status(404).json({ status: false, message: "User does not exists" })
        }
        else {
            const userData = {
                regis: user?.Registration_ID,
                frole: user?.role
            }
            return res.status(201).json({ status: true, data: userData })
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message })
    }
})

//------------------------------Password Update--------------------------------------

router.post('/api/passwordupdate', async (req, res) => {
    try {
        const { regis, newpassword, urole } = req.body
        console.log(req.body)
        // const hashPassword = await bcrypt.hash(newpassword, 10);

        let modelSchema;

        if (urole === "admin") modelSchema = adminUserData;
        else if (urole === "Teacher") modelSchema = teacherUserData;
        else modelSchema = studentUserData;

        const upPas = await modelSchema.updateOne({ Registration_ID: regis }, { $set: { password: newpassword } })
        if (!upPas) return res.status(404).json({ status: false, message: "Password not updated" })
        return res.status(201).json({ status: true, message: "Password Updated" })

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
        const { Registration_ID, VTitle, SubjectName, classIn } = req.body
        const thumbnail = req.files?.thumbnail?.[0]
        const video = req.files?.video?.[0]

        const thumbnailPath = thumbnail?.path;
        const videoPath = video?.path;

        const thumbnailStored = await uploadOnCloudinary(thumbnailPath)
        const videoStored = await uploadOnCloudinary(videoPath)

        const searchUser = await teacherUserData.findOne({ Registration_ID })
        const teacherName = searchUser?.fName + " " + searchUser?.lName

        let Video_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000
        const eReg = await uploadVideo.findOne({ Video_ID });

        while (Video_ID === eReg) {
            Video_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000
            eReg = await studentUserData.findOne({ Video_ID });
        }

        const newVideo = new uploadVideo({
            Video_ID: Video_ID,
            Registration_ID: Registration_ID,
            thumbnail: thumbnailStored?.secure_url,
            title: VTitle,
            subjectName: SubjectName,
            forClass: classIn,
            teacherName: teacherName,
            duration: videoStored?.duration,
            video: videoStored?.secure_url
        });

        const isSave = await newVideo.save();

        searchUser.videosOwn.push(isSave._id)
        await searchUser.save()

        if (isSave) {
            return res.status(201).json({ status: true, message: newVideo.title + " uploaded successfully" });
        } else {
            return res.status(404).json({ status: false, message: "Video not uploaded" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Something went wrong", error: err.message });
    }
});

//--------------------------------Videos Fetching------------------------------------

router.post('/api/classNine', async (req, res) => {
    try {
        const classNineVideos = await uploadVideo.find({ forClass: "IX" });
        return res.status(201).json({ status: true, data: classNineVideos });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching Class Nine Videos", error: err.message });
    }
})

router.post('/api/classTen', async (req, res) => {
    try {
        const classTenVideos = await uploadVideo.find({ forClass: "X" });
        return res.status(201).json({ status: true, data: classTenVideos });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching Class Ten Videos", error: err.message });
    }
})

router.post('/api/classEleven', async (req, res) => {
    try {
        const classElevenVideos = await uploadVideo.find({ forClass: "XI" });
        return res.status(201).json({ status: true, data: classElevenVideos });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching Class Eleven Videos", error: err.message });
    }
})

router.post('/api/classTwelve', async (req, res) => {
    try {
        const classTwelveVideos = await uploadVideo.find({ forClass: "XII" });
        return res.status(201).json({ status: true, data: classTwelveVideos });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching Class Twelve Videos", error: err.message });
    }
})

//--------------------------------Image Slider---------------------------------------

router.post('/api/slider', async (req, res) => {
    try {
        const sliderImages = await uploadVideo.find();
        const selectedImages = sliderImages.slice(0, 4);
        // console.log(selectedImages[0].thumbnail);
        return res.status(201).json({ status: true, data: selectedImages });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching Slider Images from Backend", error: err.message });
    }
})

//--------------------------------Fetch All Video------------------------------------

router.post('/api/allvideo', async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) return res.status(404).json({ status: false, message: "Access Denied" })

        jwt.verify(token, secretCode, async (err, decode) => {
            const user = await teacherUserData.findById(decode?.id)
            if (!user) return res.status(404).json({ status: false, message: "Invalid Token" })
            const RegID = user.Registration_ID;
            const allVideos = await uploadVideo.find({ Registration_ID: RegID });
            return res.status(201).json({ status: true, data: allVideos });
        })
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while fetching all videos from Backend" })
    }
})

//---------------------------------Delete Videos-------------------------------------

router.post("/api/deletevideo", async (req, res) => {
    try {
        const { Video_ID } = req.body
        const video = await uploadVideo.findOne({ Video_ID: Video_ID })
        const deleteVideo = await uploadVideo.deleteOne({ Video_ID: Video_ID });
        if (deleteVideo) {
            console.log("Video Deleted")
            return res.status(201).json({ status: true, message: "Video Deleted Successfully" })
        } else {
            return res.status(404).json({ status: false, message: "Video Not Found" })
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while deleting video from backend" })
    }
})

//-------------------------------Edit Videos-----------------------------------------

router.post("/api/editvideo", upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
]), async (req, res) => {
    try {
        const { Video_ID, title, subjectName, forClass } = req.body;
        const thumbnail = req.files?.thumbnail?.[0]
        const video = req.files?.video?.[0]

        const thumbnailPath = thumbnail?.path;
        const videoPath = video?.path;

        const thumbnailStored = await uploadOnCloudinary(thumbnailPath)
        const videoStored = await uploadOnCloudinary(videoPath)

        const updateData = await uploadVideo.findOneAndUpdate(
            { Video_ID: Video_ID },
            {
                $set: {
                    title: title,
                    subjectName: subjectName,
                    forClass: forClass,
                    thumbnail: thumbnailStored?.secure_url,
                    video: videoStored?.secure_url
                },
            }
        );

        if (updateData) {
            console.log("Video Updated")
            return res.status(201).json({ status: true, message: "Video Updated Successfully" })
        } else {
            return res.status(404).json({ status: false, message: "Video Not Found" })
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: "Something went wrong while updating from Backend" })
    }
})

//---------------------------------Exporting-----------------------------------------

export default router;