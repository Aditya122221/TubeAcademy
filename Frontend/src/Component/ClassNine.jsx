import React, { useState } from "react";
import { VideossNine } from '../JSX/VideossIX';
import Footer from '../JSX/Footer'
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';

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
    var color = "white";
    const [IXData, setIXData] = useState(VideossNine)
    const FilterSubjectData = [...new Set(VideossNine.map((val) => val.subjectName))]
    const FilterChannelData = [...new Set(VideossNine.map((val) => val.channelName))]
    const filterBySubject = (cat) => {
        const newItem = VideossNine.filter((newVal) => newVal.subjectName === cat)
        setIXData(newItem)
    }
    const filterByChannel = (cat) => {
        const newItem = VideossNine.filter((newVal) => newVal.channelName === cat)
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
                    <Filter filterationMethod="Filter By Subject" item={FilterSubjectData} filterItem={filterBySubject} setData={setIXData} vid={VideossNine} />
                    <Filter filterationMethod="Filter By Channel" item={FilterChannelData} filterItem={filterByChannel} setData={setIXData} vid={VideossNine} />
                </div>
                <div className={CN.videosbyfilter}>
                    {IXData.map(Clsss)}
                </div>
            </div>
            <Footer />
        </div>
    );
}