import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import CD from '../CSS/CardDesign.module.css'
import axios from "axios"
import { Play, Edit, Trash2 } from 'lucide-react';

const VideoCard = ({ 
  thumbnail = 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=225&fit=crop',
  title = 'Introduction to React Hooks',
  subject = 'Computer Science',
  classIn = 'CS 101',
  duration = '12:34',
  onPlay,
  onUpdate,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    console.log('Playing video:', title);
    if (onPlay) onPlay();
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    console.log('Updating video:', title);
    if (onUpdate) onUpdate();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Deleting video:', title);
    if (onDelete) onDelete();
  };

  return (
    <div 
      className={CD.videoCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={CD.videoCardThumbnail} onClick={handlePlay}>
        <img 
          src={thumbnail} 
          alt={title}
          className={CD.videoCardImage}
        />
        <div className={CD.videoCardOverlay}>
          <div className={`${CD.videoCardPlayBtn} ${isHovered ? CD.videoCardPlayBtnVisible : ''}`}>
            <Play className={CD.videoCardPlayIcon} />
          </div>
        </div>
        <div className={CD.videoCardDuration}>{duration}</div>
      </div>
      
      <div className={CD.videoCardContent}>
        <h3 className={CD.videoCardTitle}>{title}</h3>
        <div className={CD.videoCardMeta}>
          <p className={CD.videoCardSubject}>{subject}</p>
          <p className={CD.videoCardClass}>{classIn}</p>
        </div>
        
        <div className={CD.videoCardActions}>
          <button 
            className={`${CD.videoCardBtn} ${CD.videoCardBtnUpdate}`}
            onClick={handleUpdate}
            aria-label="Update video"
          >
            <Edit className={CD.videoCardBtnIcon} />
            Update
          </button>
          <button 
            className={`${CD.videoCardBtn} ${CD.videoCardBtnDelete}`}
            onClick={handleDelete}
            aria-label="Delete video"
          >
            <Trash2 className={CD.videoCardBtnIcon} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


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
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/deletevideo`, { Video_ID }).then((res) => {
            Navigate('/home')
            alert("Video deleted")
        }).catch((err) => {
            console.log("Error while deleting the video from frontend", err)
        })
    }
    return (
        <div className={CD.videoGridContainer}>
            <div className={CD.videoGrid}>
                {allVideo.map(video => (
                    <VideoCard
                        key={video.Video_ID}
                        thumbnail={video.thumbnail}
                        title={video.title}
                        subject={video.subjectName}
                        classIn={video.forClass}
                        duration={formatDuration(video.duration)}
                        onPlay={() => console.log(`Playing: ${video.title}`)}
                        onUpdate={() => Navigate('/editvideo', { state: video })}
                        onDelete={deleteVideo}
                    />
                ))}
            </div>
        </div>
    )
}

function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}