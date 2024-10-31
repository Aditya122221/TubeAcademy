import React from 'react';
import { VideosClassNine, VideosClassTen, VideosClassEleven, VideosClassTwelve } from '../JSX/Classes';
import { VideosNine, Head } from '../JSX/Function';
import { ClassArray } from '../JSX/Heading';
import Navbar from '../JSX/Navbar';
import Footer from '../JSX/Footer';
import HE from '../CSS/Home.module.css';
import B from '../CSS/Boxex.module.css';
import S from '../CSS/Slider.module.css'
import ImageSlider from '../JSX/ImageSlider';

export default function HomePage() {
    const Slider = [
        {
            id: 1,
            imgSrc: "https://i.ytimg.com/vi/bmzDsWMSCTk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClOmCpbzXugBWoK73fzhIpwlFqxg",
            title: "Matter in Our Surroundings Complete Chapter🔥| CLASS 9th Science| NCERT covered| Prashant Kirad",
            subject: "CHEMISTRY",
            videoLink: "https://www.youtube.com/watch?v=bmzDsWMSCTk",
            VideoLink: "https://www.youtube.com/embed/bmzDsWMSCTk"
        },
        {
            id: 2,
            imgSrc: "https://i.ytimg.com/vi/1o7IuDldhRQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDuT3Fu1X9e9_9sZ9KtFQmx2dj2Mg",
            title: "Control And Coordination Complete Chapter🔥| CLASS 10 Science | NCERT Covered| Prashant Kirad",
            subject: "BIOLOGY",
            videoLink: "https://www.youtube.com/watch?v=1o7IuDldhRQ",
            VideoLink: "https://www.youtube.com/embed/1o7IuDldhRQ"
        },
        {
            id: 3,
            imgSrc: "https://i.ytimg.com/vi/doVx4CNy9pQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAdE9AYdvWEFBzlDwjNmlSHmjLEXg",
            title: "Thermodynamics - Playlist | Class 11 | Unacademy NEET",
            subject: "PHYSICS",
            videoLink: "https://www.youtube.com/playlist?list=PLsgHooHkqhhPv8DbO_XdTmzSNb6rUvTnu",
            VideoLink: "https://www.youtube.com/embed/doVx4CNy9pQ?list=PLsgHooHkqhhPv8DbO_XdTmzSNb6rUvTnu"
        },
        {
            id: 4,
            imgSrc: "https://i.ytimg.com/vi/tQxk5IX9S_8/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDvCYjOHuY_O3g1UOYrg6ejDKOV5A",
            title: "Limits, Continuity & Differentiability - Playlist | Class 12",
            subject: "MATHS",
            videoLink: "https://www.youtube.com/playlist?list=PLbu_fGT0MPstS3DTIyqkUecSW_7axdxKe",
            VideoLink: "https://www.youtube.com/embed/tQxk5IX9S_8?list=PLbu_fGT0MPstS3DTIyqkUecSW_7axdxKe"
        }
    ]
    return (
        <div className={HE.MainHome}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={S.Slider}>
                <ImageSlider Slider={Slider}></ImageSlider>
            </div>
            <div className={HE.HomeContainer}>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassNine.map(VideosNine)}
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassTen.map(VideosNine)}
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassEleven.map(VideosNine)}
                    </div>
                    <div className={HE.fArrow}>
                        <span className="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassTwelve.map(VideosNine)}
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
