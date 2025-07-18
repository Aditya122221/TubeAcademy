import { useState, useEffect } from 'react';
import CN from '../CSS/ClassNine.module.css'
import axios from 'axios'
import Navbar from '../JSX/Navbar.jsx'
import BottomNavigation from './BottomNavigation.jsx';

const ClassNine = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [nineVideos, setNineVideos] = useState([])

    // Get unique subjects and teachers for filter options
    const subjects = [...new Set(nineVideos.map(video => video.subjectName))];
    const teachers = [...new Set(nineVideos.map(video => video.teacherName))];

    // Filter videos based on selected filters
    const filteredVideos = nineVideos.filter(video => {
        const matchesSubject = selectedSubject === '' || video.subjectName === selectedSubject;
        const matchesTeacher = selectedTeacher === '' || video.teacherName === selectedTeacher;
        return matchesSubject && matchesTeacher;
    });

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/classTen`).then((res) => {
            setNineVideos(res.data.data)
        }).catch((err) => {
            console.log("All Class Ten Videos fetching error from Frontend", err);
        })

        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    }, [])

    return (
        <div className={CN.videoLibrary}>
            <Navbar />
            <Navbar />

            <div className={CN.filtersSection}>
                <div className={CN.filterGroup}>
                    <label htmlFor="subject-filter">Subject:</label>
                    <select
                        id="subject-filter"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className={CN.filterSelect}
                    >
                        <option value="">All Subjects</option>
                        {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>

                <div className={CN.filterGroup}>
                    <label htmlFor="teacher-filter">Teacher:</label>
                    <select
                        id="teacher-filter"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                        className={CN.filterSelect}
                    >
                        <option value="">All Teachers</option>
                        {teachers.map(teacher => (
                            <option key={teacher} value={teacher}>{teacher}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={CN.resultsCount}>
                Showing {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
            </div>

            <div className={CN.videoGrid}>
                {filteredVideos.map(video => (
                    <div key={video.Video_ID} className={CN.videoCard}>
                        <div className={CN.cardThumbnail}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x300/e1e8ed/5a6c7d?text=Video+Thumbnail';
                                }}
                            />
                        </div>
                        <div className={CN.cardContent}>
                            <h3 className={CN.videoTitle}>{video.title}</h3>
                            <div className={CN.videoDetails}>
                                <span className={CN.subjectBadge}>{video.subjectName}</span>
                                <span className={CN.classInfo}>Class {video.forClass}</span>
                            </div>
                            <div className={CN.teacherInfo}>
                                <span className={CN.teacherName}>By {video.teacherName}</span>
                            </div>
                            <button
                                className={CN.watchButton}
                            >
                                Watch Video
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredVideos.length === 0 && (
                <div className={CN.noResults}>
                    <p>No videos found matching your filters.</p>
                    <p>Try adjusting your selection or browse all videos.</p>
                </div>
            )}
            <BottomNavigation />
        </div>
    );
};

export default ClassNine;