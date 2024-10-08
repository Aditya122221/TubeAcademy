import React from 'react';
import { VideosClassNine, VideosClassTen, VideosClassEleven, VideosClassTwelve } from '../JSX/Classes';
import { VideosNine, Head } from '../JSX/Function';
import { ClassArray } from '../JSX/Heading';
import Navbar from '../JSX/Navbar';
import Footer from '../JSX/Footer';
import HE from '../CSS/Home.module.css';
import B from '../CSS/Boxex.module.css';
import ImageSlider from '../JSX/ImageSlider';

export default function HomePage() {
    return (
        <div className={HE.MainHome}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <ImageSlider />
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
