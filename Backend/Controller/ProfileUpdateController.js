import { v2 as cloudinary } from "cloudinary"
import uploadOnCloudinary from "../Routes/cloudinary.js"
import adminUserData from "../Modal/adminUserData.js"
import teacherUserData from "../Modal/teacherUserData.js"
import studentUserData from "../Modal/studentUserData.js"

const ProfileUpdate = async (req, res) => {
    try {
        const { fName, lName, pNumber, uEmail, uAddress, urole } = req.body
        const avatarPath = req.file?.path
        const isStored = await uploadOnCloudinary(avatarPath)

        const modelMap = {
            admin: adminUserData,
            Teacher: teacherUserData,
            student: studentUserData,
        }
        const updateModel = modelMap[urole] || studentUserData

        if (isStored !== null) {
            const existing = await updateModel.findOne({ pNumber })
            if (existing.avatarID !== "")
                await cloudinary.uploader.destroy(existing.avatarID, {
                    resource_type: "image",
                })
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
        )

        if (updateResult.modifiedCount === 0) {
            return res
                .status(210)
                .json({ status: false, message: "Updating Error from server side. Please try again later" })
        }

        res.status(200).json({ status: true, message: "Data Updated" })
    } catch (err) {
        console.log("Error is here is backend")
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default ProfileUpdate