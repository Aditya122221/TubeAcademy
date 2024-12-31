const { v2 } = require('cloudinary')
const fs = require('fs')

v2.config({
    cloud_name: "tubeacademy",
    api_key: "875927792967197",
    api_secret: "94X08SI-tbyd8cLqxBUdmVfEACI",
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const res = await v2.uploader.upload(localFilePath, { resource_type: "auto" })
        console.log(res, " File uploaded successfully")
        return res
    } catch (error) {
        //fs.unlinkSync(localFilePath) //Remove the locally file saved
        return null
    }
}

module.export = uploadOnCloudinary