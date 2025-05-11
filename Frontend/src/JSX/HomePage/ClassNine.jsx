import { useEffect, useState } from "react"
import CD from "../../CSS/CardDesign.module.css"
import axios from "axios"

export default function ClassNine() {
    const [videos, setVideos] = useState([])

    const fetchVideos = async () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/classNine`).then((res) => {
            setVideos(res.data.data);
        }).catch((err) => {
            console.log("Class Nine Video fetching Error", err);
        });
    }

    useEffect(() => {
        fetchVideos();
    }, []);
    return (
        <div className={CD.MainClassNine}>
            {videos.slice(-3).reverse().map((video) => (
                <div className={CD.cards} key={video._id}>
                    <img className={CD.thumbnail} src={video.thumbnail} alt="Thumbnail" />
                    <h3 className={CD.title}>{video.title}</h3>
                    <div className={CD.details}>
                        <div className={CD.subject}>{video.subjectName}</div>
                        <div className={CD.classIn}>{video.forClass}</div>
                    </div>
                    <div className={CD.teacherName}>{video.teacherName}</div>
                    <button className={CD.button}>Watch Now</button>
                </div>
            ))}
        </div>
    )
}