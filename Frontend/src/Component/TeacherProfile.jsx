import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TP from '../CSS/TeacherProfile.module.css'
import TeacherRightTwo from "../JSX/TeacherUI/TeacherRightTwo";
import TeacherRightOne from "../JSX/TeacherUI/TeacherRightOne";

export default function TeacherProfile() {
    const Navigate = useNavigate();
    const [isAccount, setisAccount] = useState(true)
    const [isUpload, setisUpload] = useState(false);

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
        <div className={TP.adminProfile}>
            <div className={TP.left}>
                <div onClick={handleAccount} className={`${TP.left1} ${isAccount ? TP.selectedOne : ''}`}>Account</div>

                <div onClick={handleUpload} className={`${TP.left1} ${isUpload ? TP.selectedOne : ''}`}>Upload Video</div>

                <div onClick={handleLogOut} className={`${TP.left1} ${TP.left2}`}>Log Out</div>

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
    )
}