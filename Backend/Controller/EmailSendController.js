import email_from_client from "../Modal/email_from_client.js"

const EmailSend = async (req, res) => {
    try {
        const { Registration_ID, name, email, message } = req.body

        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" })
        }

        let queryId
        let exists = true

        while (exists) {
            queryId = Math.floor(Math.random() * 900000) + 100000
            exists = await email_from_client.findOne({ query_ID: queryId })
        }

        const now = new Date()
        const formattedDate = now
            .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(",", "")

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
        })
        await newUser.save()

        return res.status(201).json({ status: true, message: "Email sent!" })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default EmailSend