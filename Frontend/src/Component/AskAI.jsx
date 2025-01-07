import {useEffect} from "react";
import AI from '../CSS/AskAI.module.css';
import Logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import DisBot from '../Images/DismantledBot.png'

export default function AboutPage() {
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    })
    return (
        <div className={AI.AboutMain}>
            <Link to='/home'>
                <img src={Logo} alt="Logo" className={AI.logo} />
            </Link>
            <div className={AI.a}>
                <div className={AI.b}>
                    <h2 className={AI.t}>Coming Soon...</h2>
                    <p className={AI.c}>We are working on it. Try our rest of the features with ease</p>
                    <Link className={AI.d} to='/home'>Back to Home</Link>
                </div>
                <img src={DisBot} className={AI.dis} />
            </div>
        </div>
    );
}