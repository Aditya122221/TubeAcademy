import React, { useState } from "react";
import S from '../CSS/Slider.module.css'
import { Link } from "react-router-dom";

export default function ImageSlider({ Slider }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const SlideStyler = {
        backgroundImage: `url(${Slider[currentSlide].imgSrc})`,
    }
    return (
        <div className={S.ImageSlider} style={SlideStyler}>
            <div className={S.a}>
                <iframe className={S.video} width="600" height="300" src={Slider[currentSlide].VideoLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className={S.b}>{Slider[currentSlide].title}</div>
                <div className={S.c}>{Slider[currentSlide].subject}</div>
                <a href={Slider[currentSlide].videoLink} target="_blank" className={S.d}>
                    <button className={S.e}>Video Link</button>
                </a>
            </div>
            <div className={S.f}>
                <img src={Slider[0].imgSrc} onClick={() => setCurrentSlide(0)} className={S.g}></img>
                <img src={Slider[1].imgSrc} onClick={() => setCurrentSlide(1)} className={S.g}></img>
                <img src={Slider[2].imgSrc} onClick={() => setCurrentSlide(2)} className={S.g}></img>
                <img src={Slider[3].imgSrc} onClick={() => setCurrentSlide(3)} className={S.g}></img>
            </div>
        </div>
    )
}
