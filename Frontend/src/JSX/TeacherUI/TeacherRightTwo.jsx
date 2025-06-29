import { useState} from "react"
import TP from '../../CSS/TeacherProfile.module.css'
import { RegId } from "./TeacherRightOne"
import axios from 'axios'
import { Upload } from "lucide-react"

export default function TeacherRightTwo() {
    const [thumbnail, setThumbnail] = useState([])
    const [video, setVideo] = useState([])
    const [uploadStatus, setUploadStatus] = useState("")

    const [titleError, setTitleError] = useState("")

    const [upload, setUpload] = useState({
        VTitle: "",
        SubjectName: "",
        classIn: "",
    })

    const handleForm = (e) => {
        e.preventDefault();
        const val = validateForm();
        if (val) {
            setUploadStatus("Uploading")
            const payload = new FormData();
            payload.append('Registration_ID', RegId);
            payload.append('VTitle', upload.VTitle);
            payload.append('SubjectName', upload.SubjectName);
            payload.append('classIn', upload.classIn);
            payload.append("thumbnail", thumbnail);
            payload.append("video", video);

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/uploadVideo`, payload, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                setUploadStatus("File Uploaded Successfully")
            }).catch((err) => {
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
        if (alpharegex.test(upload.VTitle) && upload.VTitle !== "") {
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
            if (upload.VTitle === "") setTitleError("Title should not be empty")
            setTitleError("Title should contain only alphabets and numbers")
            return false
        }

    }

    return (
        <div className={`${TP.section} ${TP.uploadSection}`}>
            <div className={TP.sectionHeader}>
                <h2><Upload size={24} />Upload Video</h2>
            </div>

            <span className={TP.error}>{titleError}</span>
            <div className={TP.uploadForm}>
                <div className={TP.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="VTitle"
                        value={upload.VTitle}
                        onChange={handleChange}
                        placeholder="Enter video title"
                        required
                    />
                </div>

                <div className={TP.formRow}>
                    <div className={TP.formGroup}>
                        <label htmlFor="subject">Subject</label>
                        <select
                            id="subject"
                            name="SubjectName"
                            value={upload.SubjectName}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                        </select>
                    </div>

                    <div className={TP.formGroup}>
                        <label htmlFor="class">Class</label>
                        <select
                            id="class"
                            name="classIn"
                            value={upload.classIn}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="IX">IX</option>
                            <option value="X">X</option>
                            <option value="XI">XI</option>
                            <option value="XII">XII</option>
                        </select>
                    </div>
                </div>

                <div className={TP.formGroup}>
                    <label htmlFor="thumbnail">Thumbnail Upload</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className={TP.fileInput}
                    />
                </div>

                <div className={TP.formGroup}>
                    <label htmlFor="video">Video Upload</label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className={TP.fileInput}
                    />
                </div>

                <button type="button" className={TP.btnSubmit} onClick={handleForm}>
                    <Upload size={16} />
                    Submit
                </button>

                {uploadStatus && (
                    <div
                        className={`${TP.uploadStatus} ${uploadStatus.includes("Successfully")
                            ? TP.success
                            : uploadStatus.includes("Failed")
                                ? TP.error
                                : TP.info
                            }`}
                    >
                        {uploadStatus}
                    </div>
                )}
            </div>
        </div >
    )
}