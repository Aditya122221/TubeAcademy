import React, { useState, useEffect } from "react";
import Footer from '../JSX/Footer'
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';
import axios from 'axios'

export default function ClassTen() {
    const [tenVideos, setTenVideos] = useState([])

    useEffect(() => {
        axios.post("/api/classTen").then((res) => {
            setTenVideos(res.data.data)
        }).catch((err) => {
            console.log("All Class Ten Videos fetching error from Frontend", err);
        })
    }, [])


    const [XData, setXData] = useState(tenVideos)
    console.log(XData, "From Main Page")

    const filterSubjectData = [...new Set(tenVideos.map((val) => val.subjectName))]
    const teacherName = [...new Set(tenVideos.map((val) => val.teacherName))]

    const filterBySubject = (cat) => {
        const newItem = tenVideos.filter((newVal) => newVal.subjectName === cat)
        setXData(newItem)
    }

    const filterByTeacher = (cat) => {
        const newItem = tenVideos.filter((newVal) => newVal.subjectName === cat)
        setXData(newItem)
    }
    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={filterSubjectData} filterItem={filterBySubject} setData={XData} vid={tenVideos} />
                    <Filter filterationMethod="Filter By Teacher Name" item={teacherName} filterItem={filterByTeacher} setData={setXData} vid={tenVideos} />
                </div>
                <div className={CN.videosbyfilter}>
                    {tenVideos.map((video) => {
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