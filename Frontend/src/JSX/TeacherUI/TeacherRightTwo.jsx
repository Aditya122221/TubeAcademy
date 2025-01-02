import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import TP from '../../CSS/TeacherProfile.module.css'
import axios from 'axios'

export default function TeacherRightTwo() {
    const [thumbnail, setThumbnail] = useState([])
    const [video, setVideo] = useState([])

    const [titleError, setTitleError] = useState("")
    const [thumbnailError, setThumbnailError] = useState("")
    const [videoError, setVideoError] = useState("")

    const [upload, setUpload] = useState({
        VTitle: "",
        SubjectName: "",
        classIn: "",
    })

    const succRef = useRef()
    const unsuccRef = useRef()

    const handleForm = (e) => {
        e.preventDefault();
        const val = validateForm();
        if (val) {

            console.log(thumbnail)
            console.log(video)

            const payload = new FormData();
            payload.append('VTitle', upload.VTitle);
            payload.append('SubjectName', upload.SubjectName);
            payload.append('classIn', upload.classIn);
            payload.append("thumbnail", thumbnail);
            payload.append("video", video);

            axios.post("/api/uploadVideo", payload, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                console.log("This part has no error", res.data);
                succRef.current.style.display = "flex";
                unsuccRef.current.style.display = "none";
            }).catch((err) => {
                unsuccRef.current.style.display = "flex";
                succRef.current.style.display = "none";
                console.log(err);
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpload({ ...upload, [name]: value })
    }

    const validateForm = () => {
        const alpharegex = /^[a-zA-Z0-9 ]+$/
        const fileTypeOne = ["jpeg", "jpg", "png"]
        const fileTypeTwo = ["mp4", "mkv", "avi"]
        if (!(alpharegex.test(upload.VTitle))) {
            setTitleError("Title should contain only alphabets and numbers")
            return false
        }

        if (!fileTypeOne.includes(thumbnail.name.split('.').pop().toLowerCase())) {
            setThumbnailError("Invalid Image type. Upload only jpeg, jpg or png")
            return false
        }

        if (!fileTypeTwo.includes(video.name.split('.').pop().toLowerCase())) {
            setVideoError("Invalid Video type. Upload only mp4, mkv or avi")
            return false
        }

        setTitleError("")
        setThumbnailError("")
        setVideoError("")
        return true;

    }

    return (
        <div className={TP.rigth2}>
            <div className={TP.Tthh}>Upload Video</div>
            <div className={TP.account}>
                <form onSubmit={handleForm} className={TP.form}>

                    <span className={TP.errrooor}>{titleError}</span>
                    <input className={TP.input} type="text" name="VTitle" placeholder="Enter the title for the video" onChange={handleChange} value={upload.VTitle} required />

                    <select required onChange={handleChange} value={upload.SubjectName} name="SubjectName" className={TP.select}>
                        <option className={TP.option} value="">--- Select Subject ---</option>
                        <option className={TP.option} value="Mathematics">Mathematics</option>
                        <option className={TP.option} value="Physics">Physics</option>
                        <option className={TP.option} value="Chemistry">Chemistry</option>
                        <option className={TP.option} value="Biology">Biology</option>
                    </select>

                    <select required onChange={handleChange} value={upload.classIn} name="classIn" className={TP.select}>
                        <option className={TP.option} value="">--- Select Class ---</option>
                        <option className={TP.option} value="IX">IX</option>
                        <option className={TP.option} value="X">X</option>
                        <option className={TP.option} value="XI">XI</option>
                        <option className={TP.option} value="XII">XII</option>
                    </select>

                    <label className={TP.label}>Submit Thumbnail</label>
                    <span className={TP.errrooor}>{thumbnailError}</span>
                    <input className={TP.file} type="file" required name="thumbnail" onChange={(e) => setThumbnail(e.target.files[0])} />

                    <label className={TP.label}>Submit Video</label>
                    <span className={TP.errrooor}>{videoError}</span>
                    <input className={TP.file} type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} required />

                    <button className={TP.button} type="submit">Upload Video</button>
                </form>
                <span ref={succRef} className={TP.succ}>Video Uploaded Succefully</span>
                <span ref={unsuccRef} className={TP.unsucc}>Video was not uploaded</span>
            </div>
        </div>
    )
}