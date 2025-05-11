import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import CD from '../CSS/CardDesign.module.css'
import axios from "axios"

export default function TeacherHomePage() {
    const Navigate = useNavigate()
    const [allVideo, setAllVideo] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))
    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/allvideo`, {}, header).then((res) => {
            setAllVideo(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteVideo = (e, Video_ID) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/deletevideo`, {Video_ID}).then((res) => {
            Navigate('/home')
            alert("Video deleted")
        }).catch((err) => {
            console.log("Error while deleting the video from frontend", err)
        })
    }
    return (
        <div className={CD.TeacherHomePagee}>
            <div className={CD.TeacherHomePage}>
                {allVideo.map((video) => (
                    <div className={`${CD.cards} ${CD.THP}`} key={video.Video_ID}>
                        <img className={CD.thumbnail} src={video.thumbnail} alt="Thumbnail" />
                        <h3 className={CD.title}>{video.title}</h3>
                        <div className={CD.details}>
                            <div className={CD.subject}>{video.subjectName}</div>
                            <div className={CD.classIn}>{video.forClass}</div>
                        </div>
                        <div className={CD.actionButton}>
                            <button onClick={() => Navigate('/editvideo', { state: video })} className={CD.uiBtnEdit}>Edit</button>
                            <button onClick={(e)=>deleteVideo(e, video.Video_ID)} className={CD.uiBtnDelete}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}