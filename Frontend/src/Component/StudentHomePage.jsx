import { useState, useEffect } from 'react';
import Footer from '../JSX/Footer';
import B from '../CSS/Boxex.module.css';
import S from '../CSS/Slider.module.css' //Needed but not used due to some error
import ImageSlider from '../JSX/ImageSlider'; //Needed but not used due to some error
import axios from 'axios';
import BottomNavigation from './BottomNavigation';

// let Slider = []

export default function StudentHomePage() {
    const [Slider, setSlider] = useState([]);

    const fetchSlider = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/slider`).then((res) => {
            setSlider(res.data.data);
        }).catch((err) => {
            console.log("Slider Fetching error from frontend", err);
        })
    }

    useEffect(() => {
        fetchSlider();
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0)
    // const animationRef = useRef()
    // const SlideStyler = {
    //     backgroundImage: `url(${Slider[currentSlide].thumbnail})`,
    // }

    return (
        <div>
            <BottomNavigation />
        </div>
    );
}

{/* <div className={S.Slider}>
                <div className={S.ImageSlider}>
                    <div className={S.a}>
                        <iframe className={S.video} width="600" height="300" src={Slider[currentSlide].video} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div className={S.b}>{Slider[currentSlide].title}</div>
                        <div className={S.c}>{Slider[currentSlide].subjectName}</div>
                        <a href={Slider[currentSlide].video} target="_blank" className={S.d}>
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
            </div> */}