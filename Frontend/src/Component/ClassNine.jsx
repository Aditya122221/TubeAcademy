import React, { useEffect, useState } from "react";
import Footer from '../JSX/Footer'
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';
import axios from 'axios'

export default function ClassNine() {
    const [nineVideos, setNineVideos] = useState([])
    const [NineVideos, setNneVideos] = useState([]) //Should be constact and not to be changed

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/classNine`).then((res) => {
            setNineVideos(res.data.data)
            setNneVideos(res.data.data)
        }).catch((err) => {
            console.log("All Class Nine Videos fetching error from Frontend", err);
        })

        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    }, [])

    const filterSubjectData = [...new Set(NineVideos.map((val) => val.subjectName))]
    const teacherName = [...new Set(NineVideos.map((val) => val.teacherName))]

    const filterBySubject = (cat) => {
        const newItem = NineVideos.filter((newVal) => newVal.subjectName === cat)
        setNineVideos(newItem)
    }

    const filterByTeacher = (cat) => {
        const newItem = NineVideos.filter((newVal) => newVal.teacherName     === cat)
        setNineVideos(newItem)
    }

    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={filterSubjectData} filterItem={filterBySubject} setData={setNineVideos} vid={NineVideos} />
                    <Filter filterationMethod="Filter By Teacher Name" item={teacherName} filterItem={filterByTeacher} setData={setNineVideos} vid={NineVideos} />
                </div>
                <div className={CN.videosbyfilter}>
                    {nineVideos.map((video) => {
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