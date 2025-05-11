import React, { useState, useEffect } from "react";
import Footer from '../JSX/Footer'
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';
import axios from "axios";

export default function ClassEleven() {
    const [elevenVideos, setelevenVideos] = useState([])
    const [ElevenVideos, setElevenVideos] = useState([]) //Should be constact and not to be changed

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/classEleven`).then((res) => {
            setelevenVideos(res.data.data)
            setElevenVideos(res.data.data)
        }).catch((err) => {
            console.log("All Class Nine Videos fetching error from Frontend", err);
        })
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    }, [])

    const filterSubjectData = [...new Set(ElevenVideos.map((val) => val.subjectName))]
    const teacherName = [...new Set(ElevenVideos.map((val) => val.teacherName))]

    const filterBySubject = (cat) => {
        const newItem = ElevenVideos.filter((newVal) => newVal.subjectName === cat)
        setelevenVideos(newItem)
    }

    const filterByTeacher = (cat) => {
        const newItem = ElevenVideos.filter((newVal) => newVal.teacherName === cat)
        setelevenVideos(newItem)
    }
    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={filterSubjectData} filterItem={filterBySubject} setData={setelevenVideos} vid={ElevenVideos} />
                    <Filter filterationMethod="Filter By Teacher Name" item={teacherName} filterItem={filterByTeacher} setData={setelevenVideos} vid={ElevenVideos} />
                </div>
                <div className={CN.videosbyfilter}>
                    {elevenVideos.map((video) => {
                        return (
                            <div className={CN.cards} key={video._id}>
                                <img className={CN.thumbnail} src={video.thumbnail} alt="Thumbnail" />
                                <h3 className={CN.title}>{video.title}</h3>
                                <div className={CN.details}>
                                    <div className={CN.subject}>{video.subjectName}</div>
                                    <div className={CN.classIn}>{video.forClass}</div>
                                </div>
                                <div className={CN.teacherName}>{video.teacherName}</div>
                                <button className={CN.button}>Watch Now</button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}