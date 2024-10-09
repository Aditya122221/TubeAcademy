import React, { useState, useRef } from 'react';
import S from "../CSS/Slider.module.css";

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleNext = () => {
        const sliderItems = sliderRef.current.querySelector('.list').querySelectorAll('.item');
        const thumbnailItems = sliderRef.current.querySelector('.thumbnail').querySelectorAll('.item');

        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);

        // Update the thumbnail element
        thumbnailItems[currentIndex].style.display = 'none';
        thumbnailItems[(currentIndex + 1) % sliderItems.length].style.display = 'block';

        sliderRef.current.classList.add('next');
    };

    const handlePrev = () => {
        const sliderItems = sliderRef.current.querySelector('.list').querySelectorAll('.item');
        const thumbnailItems = sliderRef.current.querySelector('.thumbnail').querySelectorAll('.item');

        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);

        // Update the thumbnail element
        thumbnailItems[currentIndex].style.display = 'none';
        thumbnailItems[(currentIndex - 1 + sliderItems.length) % sliderItems.length].style.display = 'block';

        sliderRef.current.classList.add('prev');
    };

    const handleAnimationEnd = () => {
        sliderRef.current.classList.remove('next', 'prev');
    };

    return (
        <div className={S.slider} ref={sliderRef} onAnimationEnd={handleAnimationEnd}>
            <div className={S.list}>
                {items.map((item, index) => (
                    <div key={index} className={S.item}>
                        <img src={item.src} alt={item.alt} />
                        <div className={S.content}>
                            <div className={S.title}>{item.title}</div>
                            <div className={S.type}>{item.type}</div>
                            <div className={S.button}>
                                <button>Video Link</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={S.thumbnail}>
                {items.map((item, index) => (
                    <div key={index} className={S.item}>
                        <img src={item.src} alt={item.alt} />
                    </div>
                ))}
            </div>

            <div className={S.nextPrevArrows}>
                <button className={S.prev} onClick={handlePrev}>
                    &lt;
                </button>
                <button className={S.next} onClick={handleNext}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

// Sample items data (replace with your actual data)
const items = [
    {
        src: 'https://i.ytimg.com/vi/bmzDsWMSCTk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClOmCpbzXugBWoK73fzhIpwlFqxg',
        alt: '',
        title: 'Matter in Our Surroundings Complete Chapter| CLASS 9th Science| NCERT covered| Prashant Kirad',
        type: 'CHEMISTRY',
    },
    {
        src: 'https://i.ytimg.com/vi/1o7IuDldhRQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDuT3Fu1X9e9_9sZ9KtFQmx2dj2Mg',
        alt: '',
        title: 'Control And Coordination Complete Chapter🔥| CLASS 10 Science | NCERT Covered| Prashant Kirad',
        type: 'BIOLOGY',
    },
    {
        src: 'https://i.ytimg.com/vi/doVx4CNy9pQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAdE9AYdvWEFBzlDwjNmlSHmjLEXg',
        alt: '',
        title: 'Thermodynamics - Playlist | Class 11 | Unacademy NEET',
        type: 'Physics'
    },
    {
        src: 'https://i.ytimg.com/vi/tQxk5IX9S_8/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDvCYjOHuY_O3g1UOYrg6ejDKOV5A',
        alt: '',
        title: 'Limits, Continuity & Differentiability - Playlist | Class 12',
        type: 'Maths'
    }
];
