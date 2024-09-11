import React from 'react';
import { VideosClassNine, VideosClassTen, VideosClassEleven, VideosClassTwelve, Arrow } from '../JSX/Classes';
import { VideosNine } from '../JSX/Function';
import { ClassArray } from '../JSX/Heading';
import Navbar from '../JSX/Navbar';
import Footer from '../JSX/Footer';
import { Head } from '../JSX/Function';
import HE from '../CSS/Home.module.css';
import B from '../CSS/Boxex.module.css';

export default function HomePage() {
    return (
        <div className={HE.MainHome}>
            <Navbar />
            <div className={HE.container}>
                {ClassArray.map(Head)}
            </div>
            <div className={HE.HomeContainer}>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassNine.map(VideosNine)}
                    </div>
                    <Arrow addr={ClassArray[0].addr} />
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassTen.map(VideosNine)}
                    </div>
                    <Arrow addr={ClassArray[1].addr} />
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassEleven.map(VideosNine)}
                    </div>
                    <Arrow addr={ClassArray[2].addr} />
                </div>
                <div className={B.videosClassNine}>
                    <div className={B.ClassNineVideos}>
                        {VideosClassTwelve.map(VideosNine)}
                    </div>
                    <Arrow addr={ClassArray[3].addr} />
                </div>
            </div>
            <Footer />
        </div>
    );
}