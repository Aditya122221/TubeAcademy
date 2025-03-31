import React, { useState } from "react";
import Logo from '../Images/Logo.png'
import SP from '../CSS/StudentProfile.module.css';
import { Link, useNavigate } from "react-router-dom";
import StudentRightOne from "../JSX/StudentUI/StudentRightOne";

export default function StudentProfile() {
    const Navigate = useNavigate()
    const [isAccount, setisAccount] = useState(true)
    const [userData, setUserData] = useState()

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        Navigate('/')
    }

    return (
        <div className={SP.mainProfilePage}>
            <div className={SP.top}>
                <img src={Logo} alt="Logo" className={SP.logo} />
            </div>
            <div className={SP.adminProfile}>
                <div className={SP.left}>
                    <div className={`${SP.left1} ${isAccount ? SP.selectedOne : ''}`}>
                        <i className={`fa-regular fa-user ${SP.icon}`}></i>
                        <span className={SP.ttt}>Account</span>
                    </div>
                    <div onClick={handleLogOut} className={`${SP.left1} ${SP.left2}`}>
                        <i className={`fa-solid fa-arrow-right-from-bracket ${SP.icon}`}></i>
                        <span className={SP.ttt}>Log Out</span>
                    </div>
                    <Link to='/home' className={`${SP.left1} ${SP.left3}`}>Home</Link>
                </div>
                <div className={SP.right}>
                    <StudentRightOne />
                </div>
            </div>
        </div>
    )
}