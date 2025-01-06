import React, { useEffect, useState } from "react";
import Footer from '../JSX/Footer'
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';
import axios from 'axios'

export function Clsss(props) {
    return (
        <>
            <div className={CN.ClassNineee} key={props.id}>
                <img src={props.imgSrc} alt="Nothing" className={CN.imgSrcc} />
                <div className={CN.h}>
                    <div className={CN.videoNameee}>{props.videoName}</div>
                    <div className={CN.subjectClasse}>
                        <div className={CN.subjectNameee}>{props.subjectName}</div>
                        <div className={CN.ClassInee}>{props.classIn}</div>
                    </div>
                    <div className={CN.ChannelNameee}>{props.channelName} </div>
                    <a href={props.videoLink} target="_blank"><button className={CN.button}>Video Link</button></a>
                </div>
            </div>
        </>
    );
}

export default function ClassNine() {
    const [nineVideos, setNineVideos] = useState([])

    useEffect(() => {
        axios.post("/api/classNine").then((res) => {
            setNineVideos(res.data.data)
        }).catch((err) => {
            console.log("All Class Nine Videos fetching error from Frontend", err);
        })
    }, [])

    const [IXData, setIXData] = useState(nineVideos)
    console.log(IXData, "From Main Page")

    const filterSubjectData = [...new Set(nineVideos.map((val) => val.subjectName))]
    const teacherName = [...new Set(nineVideos.map((val) => val.teacherName))]

    const filterBySubject = (cat) => {
        const newItem = nineVideos.filter((newVal) => newVal.subjectName === cat)
        setIXData(newItem)
    }

    const filterByTeacher = (cat) => {
        const newItem = nineVideos.filter((newVal) => newVal.subjectName === cat)
        setIXData(newItem)
    }

    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={filterSubjectData} filterItem={filterBySubject} setData={IXData} vid={nineVideos} />
                    <Filter filterationMethod="Filter By Teacher Name" item={teacherName} filterItem={filterByTeacher} setData={setIXData} vid={nineVideos} />
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