import { v2 } from 'cloudinary'
import fs from 'fs'

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const res = await v2.uploader.upload(localFilePath, { resource_type: "auto" })
        console.log(res, " File uploaded successfully")
        return res
    } catch (error) {
        fs.unlinkSync(localFilePath) //Remove the locally file saved
        return null
    }
}

export default uploadOnCloudinary