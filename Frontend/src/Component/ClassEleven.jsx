import React, { useState } from "react";
import { VideossEleven } from '../JSX/VideossXI';
import Footer from '../JSX/Footer'
import { Clsss } from "./ClassNine";
import Filter from "../JSX/Filter";
import CN from '../CSS/ClassNine.module.css'
import Navbar from '../JSX/Navbar'
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import { ClassArray } from '../JSX/Heading';

export default function ClassNine() {
    const [XIData, setXIData] = useState(VideossEleven)
    const FilterSubjectData = [...new Set(VideossEleven.map((val) => val.subjectName))]
    const filterBySubject = (cat) => {
        const newItem = VideossEleven.filter((newVal) => newVal.subjectName === cat)
        setXIData(newItem)
    }
    return (
        <div className={CN.Block}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={CN.contaner}>
                <div className={CN.filterOption}>
                    <Filter filterationMethod="Filter By Subject" item={FilterSubjectData} filterItem={filterBySubject} setData={setXIData} vid={VideossEleven} />
                    {/* <Filter filterationMethod="Filter By Channel" item={FilterChannelData} filterItem={filterByChannel} setData={setIXData} vid={VideossNine} /> */}
                </div>
                <div className={CN.videosbyfilter}>
                    {XIData.map(Clsss)}
                </div>
            </div>
            <Footer />
        </div>
    );
}