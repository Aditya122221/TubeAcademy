import { useRef, useState, useEffect } from 'react'
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
    const [titleError, setTitleError] = useState("")

    const unsuccRef = useRef()

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
        const val = validateForm()
        if (val) {
            const formData = new FormData()
            formData.append('Video_ID', Video_Id)
            formData.append('title', VTitle)
            formData.append('subjectName', SubjectName)
            formData.append('forClass', ClassIn)
            formData.append('thumbnail', thumbnail)
            formData.append('video', video)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/editvideo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                Navigate('/home')
            }).catch((err) => {
                console.log("Error while updating data from frontend", err)
            })
        }
    }

    const validateForm = () => {
        const alpharegex = /^[a-zA-Z0-9 ]+$/
        const fileTypeOne = ["jpeg", "jpg", "png"]
        const fileTypeTwo = ["mp4", "mkv", "avi"]
        if (!(alpharegex.test(VTitle))) {
            setTitleError("Title should contain only alphabets and numbers")
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

        setTitleError("")
        return true;

    }
    return (
        <div className={VE.main}>

            <form onSubmit={handleEdit} className={VE.form}>

                <span className={VE.errrooor}>{titleError}</span>
                <input className={VE.input} type="text" name="VTitle" placeholder="Enter the title for the video" onChange={(e) => setVTitle(e.target.value)} value={VTitle} required />

                <select required onChange={(e) => setSubjectName(e.target.value)} value={SubjectName} name="SubjectName" className={VE.select}>
                    <option className={VE.option} value="">--- Select Subject ---</option>
                    <option className={VE.option} value="Mathematics">Mathematics</option>
                    <option className={VE.option} value="Physics">Physics</option>
                    <option className={VE.option} value="Chemistry">Chemistry</option>
                    <option className={VE.option} value="Biology">Biology</option>
                </select>

                <select required onChange={(e) => setClassIn(e.target.value)} value={ClassIn} name="classIn" className={VE.select}>
                    <option className={VE.option} value="">--- Select Class ---</option>
                    <option className={VE.option} value="IX">IX</option>
                    <option className={VE.option} value="X">X</option>
                    <option className={VE.option} value="XI">XI</option>
                    <option className={VE.option} value="XII">XII</option>
                </select>
                <div className={VE.uploader}>
                    <div className={VE.formm}>
                        <span className={VE.formTitle}>Upload Thumbnail</span>
                        <label htmlFor="file-input" className={VE.dropContainer}>
                            <input type="file" className={VE.fileInput} onChange={(e) => setThumbnail(e.target.files[0])} name="thumbnail" />
                        </label>
                    </div>


                    <div className={VE.formm}>
                        <span className={VE.formTitle}>Upload Video</span>
                        <label htmlFor="file-input" className={VE.dropContainer}>
                            <input type="file" className={VE.fileInput} onChange={(e) => setVideo(e.target.files[0])} name="video" />
                        </label>
                    </div>
                </div>

                <button className={VE.uiBtnUpdate} type="submit">Update Data</button>
                <button type="button" onClick={() => Navigate('/home')} className={VE.uiBtnCancel}>Cancel</button>
                <div className={VE.errrr} ref={unsuccRef}>{titleError}</div>
            </form>
        </div>
    )
}