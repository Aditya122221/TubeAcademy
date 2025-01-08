import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Images/Logo.png'
import TP from '../CSS/TeacherProfile.module.css'
import TeacherRightTwo from "../JSX/TeacherUI/TeacherRightTwo";
import TeacherRightOne from "../JSX/TeacherUI/TeacherRightOne";

export default function TeacherProfile() {
    const Navigate = useNavigate();
    const [isAccount, setisAccount] = useState(true)
    const [isUpload, setisUpload] = useState(false)

    const arightRef = useRef();
    const brightRef = useRef()

    const handleAccount = () => {
        setisAccount(true);
        setisUpload(false);
        arightRef.current.style.display = "flex";
        brightRef.current.style.display = "none";
    }
    const handleUpload = () => {
        setisAccount(false);
        setisUpload(true);
        arightRef.current.style.display = "none";
        brightRef.current.style.display = "flex";
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        Navigate('/')
    }

    return (
        <div className={TP.mainProfilePage}>
            <div className={TP.top}>
                <img src={Logo} alt="Logo" className={TP.logo} />
            </div>
            <div className={TP.adminProfile}>
                <div className={TP.left}>
                    <div onClick={handleAccount} className={`${TP.left1} ${isAccount ? TP.selectedOne : ''}`}>
                        <i className={`fa-regular fa-user ${TP.icon}`}></i>
                        <span className={TP.ttt}>Account</span>
                    </div>

                    <div onClick={handleUpload} className={`${TP.left1} ${isUpload ? TP.selectedOne : ''}`}>
                        <i class={`fa-solid fa-file-arrow-up ${TP.icon}`}></i>
                        <span className={TP.ttt}>Upload Video</span>
                    </div>

                    <div onClick={handleLogOut} className={`${TP.left1} ${TP.left2}`}>
                        <i class={`fa-solid fa-arrow-right-from-bracket ${TP.icon}`}></i>
                        <span className={TP.ttt}>Log Out</span>
                    </div>

                    <Link to='/home' className={`${TP.left1} ${TP.left3}`}>Home</Link>
                </div>
                <div className={TP.right}>
                    <div ref={arightRef} className={TP.aright}>
                        <TeacherRightOne />
                    </div>
                    <div ref={brightRef} className={TP.bright}>
                        <TeacherRightTwo />
                    </div>
                </div>
            </div>
        </div>
    )
}