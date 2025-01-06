import React, { useState, useRef } from "react";
import S from '../CSS/Slider.module.css'
// import { Slider } from "../Component/HomePage";

export default function ImageSlider({Slider}) {
    console.log(Slider, "From inside the ImageSlider");
    const [currentSlide, setCurrentSlide] = useState(0)
    const animationRef = useRef()
    const SlideStyler = {
        backgroundImage: `url(${Slider[currentSlide].thumbnail})`,
    }
    return (
        <div className={S.ImageSlider} style={SlideStyler}>
            <div ref={animationRef} className={S.a}>
                <iframe className={S.video} width="600" height="300" src={Slider[currentSlide].video} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className={S.b}>{Slider[currentSlide].title}</div>
                <div className={S.c}>{Slider[currentSlide].subjectName}</div>
                <a href={Slider[currentSlide].videoLink} target="_blank" className={S.d}>
                    <button className={S.e}>Video Link</button>
                </a>
            </div>
            <div className={S.f}>
                <img src={Slider[0].thumbnail} onClick={() => setCurrentSlide(0)} className={S.g}></img>
                <img src={Slider[1].thumbnail} onClick={() => setCurrentSlide(1)} className={S.g}></img>
                <img src={Slider[2].thumbnail} onClick={() => setCurrentSlide(2)} className={S.g}></img>
                <img src={Slider[3].thumbnail} onClick={() => setCurrentSlide(3)} className={S.g}></img>
            </div>
        </div >
    )
}