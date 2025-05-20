import express from "express";
const router = express.Router();
import { v2 as cloudinary } from "cloudinary";
import email_from_client from "../Modal/email_from_client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import upload from "./multer.js";
import uploadOnCloudinary from "./cloudinary.js";
import nodemailer from "nodemailer";
import adminUserData from "../Modal/adminUserData.js";
import teacherUserData from "../Modal/teacherUserData.js";
import studentUserData from "../Modal/studentUserData.js";
import uploadVideo from "../Modal/uploadVideo.js";

const secretCode = process.env.ACCESS_TOKEN;
let teacherData = []
let studentData = []
let queryData = []
let personalQuery = []
let statusQuery = []
let teacherVideo = []
let studentVideo = []

//---------------------------Signup or Register--------------------------------------

router.post("/api/signup", async (req, res) => {
  try {
    const { fName, lName, pNumber, role, password, email, address } = req.body;

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
    };

    const config = roleConfigs[role];
    if (!config) {
      return res.status(400).json({ status: false, message: "Invalid role" });
    }

    const { model, regMin, regMax } = config;

    const existingPhone = await model.findOne({ pNumber });
    const existingEmail = await model.findOne({ email });
    if (existingPhone || existingEmail) {
      return res.status(409).json({
        status: false,
        message: "User with this phone number already exists",
      });
    }

    // Generate unique Registration_ID
    let Registration_ID;
    let isDuplicate = true;
    while (isDuplicate) {
      Registration_ID =
        Math.floor(Math.random() * (regMax - regMin + 1)) + regMin;
      isDuplicate = await model.findOne({ Registration_ID });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    });

    await newUser.save();

    //-------------------------Sending Mail-----------------------------------

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.APP_PASSWORD,
      },
    });

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
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error:", error);
      }
    });

    return res
      .status(201)
      .json({ status: true, message: "Registration Successful!" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

//------------------------------------Log In-----------------------------------------

router.post("/api/login", async (req, res) => {
  try {
    // Validate required fields
    const { Reg_ID, password, role } = req.body;
    if (!Reg_ID || !password || !role) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    let modelSchema;

    if (role === "admin") modelSchema = adminUserData;
    else if (role === "Teacher") modelSchema = teacherUserData;
    else modelSchema = studentUserData;

    // Find user by pNumber
    const user = await modelSchema.findOne({ Registration_ID: Reg_ID });

    // Check user existence and password validity
    if (!user || !user.password || !(password === user.password)) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }

    // Generate JWT token with appropriate claims
    const token = jwt.sign({ id: user._id, role: user.role }, secretCode);
    const RegID = user.Registration_ID;
    const roleAction = user.role;

    // Send successful login response
    return res.status(200).json({
      status: true,
      message: "Login Successful!",
      token,
      roleAction,
      RegID,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

//---------------------------------Profile-------------------------------------------

router.post("/api/profile", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const role = req.headers?.role;

    if (!token)
      return res.status(404).json({ status: false, message: "Access Denied" });

    let modelSchema;

    if (role === "admin") modelSchema = adminUserData;
    else if (role === "Teacher") modelSchema = teacherUserData;
    else modelSchema = studentUserData;

    jwt.verify(token, secretCode, async (err, decode) => {
      const user = await modelSchema.findById(decode?.id);
      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "Invalid Token" });
      const userData = {
        id: user.id,
        Registration_ID: user?.Registration_ID,
        avatar: user?.avatar,
        fName: user?.fName,
        lName: user?.lName,
        pNumber: user?.pNumber,
        email: user?.email,
        address: user?.address,
      };

      return res
        .status(201)
        .json({ status: true, message: "Profile Data", data: userData });
    });
  } catch (err) {
    return res.status(404).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//-------------------------------Email Sending-------------------------------------

router.post("/api/email", cors(), async (req, res) => {
  try {
    const { Registration_ID, name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    let queryId;
    let exists = true;

    while (exists) {
      queryId = Math.floor(Math.random() * 900000) + 100000;
      exists = await email_from_client.findOne({ query_ID: queryId });
    }

    const now = new Date();
    const formattedDate = now
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");

    // console.log(formattedDate);

    const newUser = new email_from_client({
      query_ID: queryId,
      Registration_ID,
      fullname: name,
      email,
      message,
      queryDate: formattedDate,
      replyMessage: "",
      resolveDate: "",
      status: "pending",
    });
    await newUser.save();

    return res.status(201).json({ status: true, message: "Email sent!" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//--------------------------------Update Data----------------------------------------

router.post("/api/update", upload.single("avatar"), async (req, res) => {
  try {
    const { fName, lName, pNumber, uEmail, uAddress, urole } = req.body;
    const avatarPath = req.file?.path;
    const isStored = await uploadOnCloudinary(avatarPath);

    const modelMap = {
      admin: adminUserData,
      Teacher: teacherUserData,
      student: studentUserData,
    };
    const updateModel = modelMap[urole] || studentUserData;

    if (isStored !== null) {
      const existing = await updateModel.findOne({ pNumber });
      if (existing.avatarID !== "")
        await cloudinary.uploader.destroy(existing.avatarID, {
          resource_type: "image",
        });
    }

    const updateResult = await updateModel.updateOne(
      { pNumber },
      {
        $set: {
          avatar: isStored?.secure_url,
          avatarID: isStored?.public_id,
          fName,
          lName,
          email: uEmail,
          address: uAddress,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ status: false, message: "Updating Error" });
    }

    res.status(201).json({ status: true, message: "Data Updated" });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//--------------------------------User Check-----------------------------------------

router.post("/api/usercheck", async (req, res) => {
  try {
    const { fpnumber, regis, frole } = req.body;

    let modelSchema;

    if (frole === "fadmin") modelSchema = adminUserData;
    else if (frole === "fTeacher") modelSchema = teacherUserData;
    else modelSchema = studentUserData;

    const user = await modelSchema.findOne({
      $and: [{ Registration_ID: regis }, { pNumber: fpnumber }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User does not exists" });
    } else {
      const userData = {
        regis: user?.Registration_ID,
        frole: user?.role,
      };
      return res.status(201).json({ status: true, data: userData });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//------------------------------Password Update--------------------------------------

router.post("/api/passwordupdate", async (req, res) => {
  try {
    const { regis, newpassword, urole } = req.body;
    console.log(req.body);
    // const hashPassword = await bcrypt.hash(newpassword, 10);

    let modelSchema;

    if (urole === "admin") modelSchema = adminUserData;
    else if (urole === "Teacher") modelSchema = teacherUserData;
    else modelSchema = studentUserData;

    const upPas = await modelSchema.updateOne(
      { Registration_ID: regis },
      { $set: { password: newpassword } }
    );
    if (!upPas)
      return res
        .status(404)
        .json({ status: false, message: "Password not updated" });
    return res.status(201).json({ status: true, message: "Password Updated" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//-------------------------Details Fetching for Admin--------------------------------

router.post("/api/teacherDetails", async (req, res) => {
  try {
    if (teacherData.length === 0) {
      teacherData = await teacherUserData.find()
    }
    return res.status(201).json({ status: true, data: teacherData });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/api/studentDetails", async (req, res) => {
  try {
    if (studentData.length === 0) {
      studentData = await studentUserData.find()
    }
    return res.status(201).json({ status: true, data: studentData });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/api/queryDetails", async (req, res) => {
  try {
    const { Registration_ID } = req.body;
    if (personalQuery.length === 0) {
      personalQuery = await email_from_client.find({ Registration_ID });
    }
    return res.status(201).json({ status: true, data: personalQuery });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//-------------------------------Upload Video----------------------------------------

router.post(
  "/api/uploadVideo",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { Registration_ID, VTitle, SubjectName, classIn } = req.body;
      const thumbnail = req.files?.thumbnail?.[0];
      const video = req.files?.video?.[0];

      const thumbnailPath = thumbnail?.path;
      const videoPath = video?.path;

      const thumbnailStored = await uploadOnCloudinary(thumbnailPath);
      const videoStored = await uploadOnCloudinary(videoPath);

      const searchUser = await teacherUserData.findOne({ Registration_ID });
      const teacherName = searchUser?.fName + " " + searchUser?.lName;

      let Video_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      const eReg = await uploadVideo.findOne({ Video_ID });

      while (Video_ID === eReg) {
        Video_ID = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        eReg = await studentUserData.findOne({ Video_ID });
      }

      const newVideo = new uploadVideo({
        Video_ID: Video_ID,
        Registration_ID: Registration_ID,
        thumbnail: thumbnailStored?.secure_url,
        thumbnailID: thumbnailStored?.public_id,
        title: VTitle,
        subjectName: SubjectName,
        forClass: classIn,
        teacherName: teacherName,
        duration: videoStored?.duration,
        video: videoStored?.secure_url,
        videoID: videoStored?.public_id,
      });

      const isSave = await newVideo.save();

      searchUser.videosOwn.push(isSave._id);
      await searchUser.save();

      if (isSave) {
        return res.status(201).json({
          status: true,
          message: newVideo.title + " uploaded successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Video not uploaded" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Server side",
        error: err.message,
      });
    }
  }
);

//--------------------------------Videos Fetching------------------------------------

router.post("/api/classNine", async (req, res) => {
  try {
    if (studentVideo.length === 0) {
      studentVideo = await uploadVideo.find()
    }

    const classNineVideos = studentVideo.filter((item) => (item.forClass === "IX"))
    return res.status(201).json({ status: true, data: classNineVideos });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching Class Nine Videos",
      error: err.message,
    });
  }
});

router.post("/api/classTen", async (req, res) => {
  try {
    const classTenVideos = studentVideo.filter((item) => (item.forClass === "X"));
    return res.status(201).json({ status: true, data: classTenVideos });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching Class Ten Videos",
      error: err.message,
    });
  }
});

router.post("/api/classEleven", async (req, res) => {
  try {
    const classElevenVideos = studentVideo.filter((item) => (item.forClass === "XI"));
    return res.status(201).json({ status: true, data: classElevenVideos });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching Class Eleven Videos",
      error: err.message,
    });
  }
});

router.post("/api/classTwelve", async (req, res) => {
  try {
    const classTwelveVideos = studentVideo.filter((item) => (item.forClass === "XII"));
    return res.status(201).json({ status: true, data: classTwelveVideos });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching Class Twelve Videos",
      error: err.message,
    });
  }
});

//--------------------------------Image Slider---------------------------------------

router.post("/api/slider", async (req, res) => {
  try {
    const sliderImages = await uploadVideo.find();
    const selectedImages = sliderImages.slice(0, 4);
    // console.log(selectedImages[0].thumbnail);
    return res.status(201).json({ status: true, data: selectedImages });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching Slider Images from Backend",
      error: err.message,
    });
  }
});

//--------------------------------Fetch All Video------------------------------------

router.post("/api/allvideo", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.status(404).json({ status: false, message: "Access Denied" });

    jwt.verify(token, secretCode, async (err, decode) => {
      const user = await teacherUserData.findById(decode?.id);
      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "Invalid Token" });
      if (teacherVideo.length === 0) {
        const RegID = user.Registration_ID;
        teacherVideo = await uploadVideo.find({ Registration_ID: RegID });
      }
      return res.status(201).json({ status: true, data: teacherVideo });
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching all videos from Backend",
    });
  }
});

//---------------------------------Delete Videos-------------------------------------

router.post("/api/deletevideo", async (req, res) => {
  try {
    const { Video_ID } = req.body;
    const video = await uploadVideo.findOne({ Video_ID });

    if (!video) {
      return res
        .status(404)
        .json({ status: false, message: "Video Not Found" });
    }

    await Promise.all([
      cloudinary.uploader.destroy(video.thumbnailID, {
        resource_type: "image",
      }),
      cloudinary.uploader.destroy(video.videoID, { resource_type: "video" }),
    ]);

    await uploadVideo.deleteOne({ Video_ID });

    return res
      .status(200)
      .json({ status: true, message: "Video Deleted Successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while deleting video from backend",
    });
  }
});

//-------------------------------Edit Videos-----------------------------------------

router.post(
  "/api/editvideo",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { Video_ID, title, subjectName, forClass } = req.body;
      const thumbnail = req.files?.thumbnail?.[0];
      const video = req.files?.video?.[0];

      const existing = await uploadVideo.findOne({ Video_ID });
      if (!existing) {
        return res
          .status(404)
          .json({ status: false, message: "Video Not Found" });
      }

      const [thumbnailStored, videoStored] = await Promise.all([
        thumbnail?.path ? uploadOnCloudinary(thumbnail.path) : null,
        video?.path ? uploadOnCloudinary(video.path) : null,
      ]);

      if (thumbnailStored !== null) {
        await cloudinary.uploader.destroy(existing.thumbnailID, {
          resource_type: "image",
        });
      }
      if (videoStored !== null) {
        await cloudinary.uploader.destroy(existing.videoID, {
          resource_type: "video",
        });
      }

      // Update DB entry
      const updated = await uploadVideo.findOneAndUpdate(
        { Video_ID },
        {
          $set: {
            title,
            subjectName,
            forClass,
            thumbnail: thumbnailStored?.secure_url || existing.thumbnail,
            thumbnailID: thumbnailStored?.public_id || existing.thumbnailID,
            video: videoStored?.secure_url || existing.video,
            videoID: videoStored?.public_id || existing.videoID,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Video Updated Successfully",
        updatedVideo: updated,
      });
    } catch (err) {
      console.error("Edit video error:", err);
      return res.status(500).json({
        status: false,
        message: "Something went wrong while updating from backend",
      });
    }
  }
);

//---------------------------------Staff Details------------------------------------

router.post("/api/staff", async (req, res) => {
  try {
    if (teacherData.length === 0) {
      teacherData = await teacherUserData.find()
    }

    if (studentData.length === 0) {
      studentData = await studentUserData.find()
    }

    if (statusQuery.length === 0) {
      statusQuery = await email_from_client.find({status: "pending"})
    }

    const allStaff = { teacherData, studentData, statusQuery };

    return res.status(201).json({ status: true, data: allStaff });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message:
        "Something went wrong while fetching staff detail from server side",
    });
  }
});

//---------------------------------replying query-----------------------------------

router.post("/api/replyingquery", async (req, res) => {
  try {
    const { query_ID, replyMessage } = req.body;

  if (!replyMessage) {
    return res.status(400);
  }

  const now = new Date();
  const formattedDate = now
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  const upQuery = await email_from_client.updateOne(
    { query_ID },
    { $set: { replyMessage, resolveDate: formattedDate, status: "resolved" } }
  );

  if (!upQuery) {
    return res.status(400);
    }
    
    statusQuery = await email_from_client.find({status: "pending"})

  return res.status(200);
  } catch (err) {
    return res.status(500).send("Server side error", err)
  }
});

router.post("/api/queryAll", async (req, res) => {
  try {
    if (queryData.length === 0) {
      queryData = await email_from_client.find()
    }
    return res.status(200).json({ data: queryData });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Fetching data error from server side" });
  }
});

//---------------------------------Exporting-----------------------------------------

export default router;
