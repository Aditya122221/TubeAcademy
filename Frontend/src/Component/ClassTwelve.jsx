import React, { useState } from "react";
import { VideossTwelve } from '../JSX/VideossXII';
import Footer from '../JSX/Footer'
import { Clsss } from "./ClassNine";
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';

export default function ClassNine() {
    const [XIIData, setXIIData] = useState(VideossTwelve)
    const FilterSubjectData = [...new Set(VideossTwelve.map((val) => val.subjectName))]
    const filterBySubject = (cat) => {
        const newItem = VideossTwelve.filter((newVal) => newVal.subjectName === cat)
        setXIIData(newItem)
    }
    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={FilterSubjectData} filterItem={filterBySubject} setData={setXIIData} vid={VideossTwelve} />
                    {/* <Filter filterationMethod="Filter By Channel" item={FilterChannelData} filterItem={filterByChannel} setData={setIXData} vid={VideossNine} /> */}
                </div>
                <div className={CN.videosbyfilter}>
                    {XIIData.map(Clsss)}
                </div>
            </div>
            <Footer />
        </div>
    );
}