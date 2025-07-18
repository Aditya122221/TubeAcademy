import uploadVideo from "../Modal/uploadVideo.js"

export const ClassNine = async (req, res) => {
	try {
		const classNineVideos = await uploadVideo.find({ forClass: "IX" })
		return res.status(201).json({ status: true, data: classNineVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Nine Videos",
			error: err.message,
		})
	}
}

export const ClassTen = async (req, res) => {
	try {
		const classTenVideos = await uploadVideo.find({ forClass: "X" })
		return res.status(201).json({ status: true, data: classTenVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Ten Videos",
			error: err.message,
		})
	}
}

export const ClassEleven = async (req, res) => {
	try {
		const classElevenVideos = await uploadVideo.find({ forClass: "XI" })
		return res.status(201).json({ status: true, data: classElevenVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Eleven Videos",
			error: err.message,
		})
	}
}

export const ClassTwelve = async (req, res) => {
	try {
		const classTwelveVideos = await uploadVideo.find({ forClass: "XII" })
		return res.status(201).json({ status: true, data: classTwelveVideos })
	} catch (err) {
		return res.status(500).json({
			status: false,
			message: "Something went wrong while fetching Class Twelve Videos",
			error: err.message,
		})
	}
}