import { useState, useEffect } from 'react';
import Footer from '../JSX/Footer';
import axios from 'axios';
import BottomNavigation from './BottomNavigation';

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

    return (
        <div>
            <BottomNavigation />
        </div>
    );
}