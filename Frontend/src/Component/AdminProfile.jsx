import React, { useState, useRef } from "react"
import AP from '../CSS/AdminProfile.module.css'
import Logo from '../Images/Logo.png'
import { Link, useNavigate } from "react-router-dom"
import AdminRightOne from "../JSX/AdminUI/AdminRightOne"
import AdminRightTwo from "../JSX/AdminUI/AdminRightTwo"
import AdminRightThree from "../JSX/AdminUI/AdminRightThree"
import AdminRightFour from "../JSX/AdminUI/AdminRightFour"

export default function AdminProfile() {
    const Navigate = useNavigate();

    const [isAccount, setisAccount] = useState(true)
    const [isTeach, setisTeach] = useState(false)
    const [isStud, setisStud] = useState(false)
    const [isQuery, setisQuery] = useState(false)

    const arightRef = useRef()
    const brightRef = useRef()
    const crightRef = useRef()
    const drightRef = useRef()

    const handleAccount = () => {
        setisAccount(true)
        setisStud(false)
        setisTeach(false)
        setisQuery(false)
        arightRef.current.style.display = "flex"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "none"
    }
    const handleTeac = () => {
        setisAccount(false)
        setisStud(false)
        setisTeach(true)
        setisQuery(false)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "flex"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "none"
    }
    const handleStud = () => {
        setisAccount(false)
        setisStud(true)
        setisTeach(false)
        setisQuery(false)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "flex"
        drightRef.current.style.display = "none"
    }
    const handleQuery = () => {
        setisAccount(false)
        setisStud(false)
        setisTeach(false)
        setisQuery(true)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "flex"
    }

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        Navigate('/')
    }

    return (
        <div className={AP.mainProfilePage}>
            <div className={AP.top}>
                <img src={Logo} alt="Logo" className={AP.logo} />
            </div>
            <div className={AP.adminProfile}>
                <div className={AP.left}>
                    <div onClick={handleAccount} className={`${AP.left1} ${isAccount ? AP.selectedOne : ''}`}>
                        <i className={`fa-regular fa-user ${AP.icon}`}></i>
                        <span className={AP.ttt}>Account</span>
                    </div>

                    <div onClick={handleTeac} className={`${AP.left1} ${isTeach ? AP.selectedOne : ''}`}>
                        <i className={`fa-regular fa-address-card ${AP.icon}`}></i>
                        <span className={AP.ttt}>Registered Teacher</span>
                    </div>

                    <div onClick={handleStud} className={`${AP.left1} ${isStud ? AP.selectedOne : ''}`}>
                        <i className={`fa-regular fa-address-card ${AP.icon}`}></i>
                        <span className={AP.ttt}>Registered Student</span>
                    </div>

                    <Link to='/signup' className={`${AP.left1} ${AP.left2}`}>Register a Member</Link>

                    <div onClick={handleQuery} className={`${AP.left1} ${isQuery ? AP.selectedOne : ''}`}>
                        <i className={`fa-solid fa-clipboard-question ${AP.icon}`}></i>
                        <span className={AP.ttt}>Query</span>
                    </div>

                    <div onClick={handleLogOut} className={`${AP.left1} ${AP.left2}`}>
                        <i className={`fa-solid fa-arrow-right-from-bracket ${AP.icon}`}></i>
                        <span className={AP.ttt}>Log Out</span>
                    </div>

                    <Link to='/home' className={`${AP.left1} ${AP.left3}`}>Home</Link>
                </div>

                {/* -----------------------Account Details----------------------- */}

                <div className={AP.right}>
                    <div ref={arightRef} className={AP.aright}>
                        <AdminRightOne />
                    </div>

                    {/* ---------------------Teacher Details--------------------- */}

                    <div ref={brightRef} className={AP.bright}>
                        <AdminRightTwo />
                    </div>

                    {/* -------------------------Student Details--------------------- */}

                    <div ref={crightRef} className={AP.cright}>
                        <AdminRightThree />
                    </div>

                    {/* --------------------Query-------------------------------- */}

                    <div ref={drightRef} className={AP.dright}>
                        <AdminRightFour />
                    </div>
                </div>
            </div >
        </div>
    )
}