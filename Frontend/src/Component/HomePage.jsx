import { useState, useEffect } from 'react';
import { Head } from '../JSX/Function';
import { ClassArray } from '../JSX/Heading';
import Navbar from '../JSX/Navbar';
import Footer from '../JSX/Footer';
import HE from '../CSS/Home.module.css';
import B from '../CSS/Boxex.module.css';
import S from '../CSS/Slider.module.css'
import ImageSlider from '../JSX/ImageSlider';
import ClassNine from '../JSX/HomePage/ClassNine';
import ClassTen from '../JSX/HomePage/ClassTen';
import ClassEleven from '../JSX/HomePage/ClassEleven';
import ClassTwelve from '../JSX/HomePage/ClassTwelve';
import axios from 'axios';

let Slider = []

export default function HomePage() {

    const fetchSlider = () => {
        axios.post("/api/slider").then((res) => {
            console.log(res.data.data, "From inside the axios");
            Slider = res.data.data;
        }).catch((err) => {
            console.log("Slider Fetching error from frontend", err);
        })
    }

    useEffect(() => {
        fetchSlider();
    }, []);

    return (
        <div className={HE.MainHome}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={S.Slider}>
                {/* <ImageSlider Slider={Slider}></ImageSlider> */}
            </div>
            <div className={HE.HomeContainer}>
                <div className={B.videosClassNine}>
                    <ClassNine />
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        <ClassTen />
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        <ClassEleven />
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        <ClassTwelve />
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export { Slider };