import { useState, useEffect } from 'react'
import VE from '../CSS/VideoEdit.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function VideoEdit() {
    const location = useLocation()
    const Navigate = useNavigate()

    const [Video_Id, setId] = useState()
    const [VTitle, setVTitle] = useState()
    const [SubjectName, setSubjectName] = useState()
    const [ClassIn, setClassIn] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [video, setVideo] = useState()
    const [info, setInfo] = useState("")
    const [isDis, setIsDis] = useState(false)
    const [isClass, setIsClass] = useState(3)

    useEffect(() => {
        if (localStorage.getItem('token') === null || !location.state) {
            window.location.href = '/home';
        }
        setId(location.state.Video_ID)
        setVTitle(location.state.title)
        setSubjectName(location.state.subjectName)
        setClassIn(location.state.forClass)
    }, [])

    const handleEdit = (e) => {
        e.preventDefault()
        setIsDis(true)
        setInfo("Input validating...")
        setIsClass(2)
        const val = validateForm()
        if (val) {
            setInfo("Video detail updating...")
            setIsClass(2)
            const formData = new FormData()
            formData.append('Video_ID', Video_Id)
            formData.append('title', VTitle)
            formData.append('subjectName', SubjectName)
            formData.append('forClass', ClassIn)
            formData.append('thumbnail', thumbnail)
            formData.append('video', video)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/editvideo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                if (res.status !== 200) {
                    setInfo(res.data.message)
                    setIsClass(1)
                    setIsDis(false)
                } else {
                    setIsDis(false)
                    setInfo(res.data.message)
                    setIsClass(0)
                    Navigate('/home')
                }
            }).catch((err) => {
                setIsDis(false)
                setInfo("Failed to update")
                setIsClass(1)
                console.log("Error while updating data from frontend", err)
            })
        }
    }

    const validateForm = () => {
        const alpharegex = /^[a-zA-Z0-9 ]+$/
        const fileTypeOne = ["jpeg", "jpg", "png"]
        const fileTypeTwo = ["mp4", "mkv", "avi"]
        if (!(alpharegex.test(VTitle))) {
            setInfo("Title should contain only alphabets and numbers")
            setIsClass(1)
            return false
        }

        // if (thumbnail.name !== null) {
        //     if (!fileTypeOne.includes(thumbnail.name.split('.').pop().toLowerCase())) {
        //         alert("Invalid Image type. Upload only jpeg, jpg or png")
        //         return false
        //     }

        // }

        // if (video.name !== null) {
        //     if (!fileTypeTwo.includes(video.name.split('.').pop().toLowerCase())) {
        //         alert("Invalid Video type. Upload only mp4, mkv or avi")
        //         return false
        //     }
        // }
        return true;

    }
    return (
        <div className={VE.editVideoContainer}>
            <div className={VE.editVideoWrapper}>
                <div className={VE.header}>
                    <h1 className={VE.title}>Edit Video</h1>
                    <p className={VE.subtitle}>Update your video content and details</p>
                </div>

                <form className={VE.editVideoForm} onSubmit={handleEdit}>
                    <div className={VE.formGrid}>
                        {/* Video Title */}
                        <div className={`${VE.formGroup} ${VE.fullWidth}`}>
                            <input
                                type="text"
                                name="VTitle"
                                className={VE.formInput}
                                placeholder="Enter video title"
                                value={VTitle}
                                onChange={(e) => setVTitle(e.target.value)}
                            />
                        </div>

                        {/* Subject and Class */}
                        <div className={VE.formGroup}>
                            <select
                                name="SubjectName"
                                className={VE.formSelect}
                                value={SubjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            >
                                <option value="" disabled>Select subject</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                            </select>
                        </div>

                        <div className={VE.formGroup}>
                            <select
                                name="ClassIn"
                                className={VE.formSelect}
                                value={ClassIn}
                                onChange={(e) => setClassIn(e.target.value)}
                            >
                                <option value="" disabled>Select class</option>
                                <option value="IX">IX</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className={`${VE.formGroup} ${VE.fullWidth}`}>
                            <div className={VE.fileUploadContainer}>
                                <label className={VE.fileUploadLabel} htmlFor="thumbnail">
                                    <div className={VE.fileUploadContent}>
                                        <svg className={VE.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7,10 12,15 17,10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <span>Upload Thumbnail</span>
                                        <small>PNG, JPG up to 10MB</small>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="thumbnail"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files[0])}
                                    className={VE.fileInput}
                                />
                            </div>
                        </div>

                        {/* Video Upload */}
                        <div className={`${VE.formGroup} ${VE.fullWidth}`}>
                            <div className={VE.fileUploadContainer}>
                                <label className={VE.fileUploadLabel} htmlFor="video">
                                    <div className={VE.fileUploadContent}>
                                        <svg className={VE.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <polygon points="23,7 16,12 23,17" />
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                        </svg>
                                        <span>Upload Video</span>
                                        <small>MP4, AVI, MOV up to 100MB</small>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="video"
                                    name="video"
                                    accept="video/*"
                                    onChange={(e) => setVideo(e.target.files[0])}
                                    className={VE.fileInput}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={VE.buttonGroup}>
                        <button type="button" className={`${VE.btn} ${VE.btnCancel}`} onClick={() => Navigate('/home')} disabled={isDis}>
                            Cancel
                        </button>
                        <button type="submit" className={`${VE.btn} ${VE.btnUpdate}`} disabled={isDis}>
                            <span>Update Video</span>
                            <svg className={VE.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 12l5 5L20 7" />
                            </svg>
                        </button>
                    </div>
                    <span className={`${VE.er} ${isClass === 0 ? VE.succ : isClass === 1 ? VE.error : isClass === 2 ? VE.info: ""}`}>{info}</span>
                </form>
            </div>
        </div>
    )
}