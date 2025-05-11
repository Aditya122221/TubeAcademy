import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import TP from '../../CSS/TeacherProfile.module.css'
import { RegId } from "./TeacherRightOne"
import axios from 'axios'

export default function TeacherRightTwo() {
    const [thumbnail, setThumbnail] = useState([])
    const [video, setVideo] = useState([])

    const [titleError, setTitleError] = useState("")

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
            const payload = new FormData();
            payload.append('Registration_ID', RegId);
            payload.append('VTitle', upload.VTitle);
            payload.append('SubjectName', upload.SubjectName);
            payload.append('classIn', upload.classIn);
            payload.append("thumbnail", thumbnail);
            payload.append("video", video);

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/uploadVideo`, payload, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                succRef.current.style.display = "flex";
                unsuccRef.current.style.display = "none";
            }).catch((err) => {
                unsuccRef.current.style.display = "flex";
                succRef.current.style.display = "none";
                console.log("client side", err);
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
        if (alpharegex.test(upload.VTitle)) {
            if (fileTypeOne.includes(thumbnail.name.split('.').pop().toLowerCase())) {
                if (fileTypeTwo.includes(video.name.split('.').pop().toLowerCase())) {
                    setTitleError("")
                    return true
                } else {
                    setTitleError("Invalid Video type. Upload only mp4, mkv or avi")
                    return false
                }
            } else {
                setTitleError("Invalid Image type. Upload only jpeg, jpg or png")
                return false
            }
        }
        else {
            setTitleError("Title should contain only alphabets and numbers")
            return false
        }

    }

    return (
        <div className={TP.rigth2}>
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
                    <div className={TP.uploader}>
                        <div className={TP.formm}>
                            <span className={TP.formTitle}>Upload Thumbnail</span>
                            <label htmlFor="file-input" className={TP.dropContainer}>
                                <input type="file" required="" className={TP.fileInput} onChange={(e)=>setThumbnail(e.target.files[0])} name="thumbnail" />
                            </label>
                        </div>


                        <div className={TP.formm}>
                            <span className={TP.formTitle}>Upload Video</span>
                            <label htmlFor="file-input" className={TP.dropContainer}>
                                <input type="file" required="" className={TP.fileInput} onChange={(e)=>setVideo(e.target.files[0])} name="video" />
                            </label>
                        </div>
                    </div>

                    <button className={TP.button} type="submit">Upload Video</button>
                </form>
                <span ref={succRef} className={TP.succ}>Video Uploaded Succefully</span>
                <span ref={unsuccRef} className={TP.unsucc}>Video was not uploaded</span>
            </div>
        </div>
    )
}