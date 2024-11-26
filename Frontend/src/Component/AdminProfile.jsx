import React, { useState, useRef, useEffect } from "react";
import AP from '../CSS/AdminProfile.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AdminProfile() {
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))

    const [isAccount, setisAccount] = useState(true)
    const [isTeach, setisTeach] = useState(false)
    const [isStud, setisStud] = useState(false)
    const [isQuery, setisQuery] = useState(false)
    const [userData, setUserData] = useState('');

    const arightRef = useRef();
    const brightRef = useRef();
    const crightRef = useRef();
    const drightRef = useRef()

    const handleAccount = () => {
        setisAccount(true);
        setisStud(false);
        setisTeach(false);
        setisQuery(false)
        arightRef.current.style.display = "flex";
        brightRef.current.style.display = "none";
        crightRef.current.style.display = "none";
        drightRef.current.style.display = "none";
    }
    const handleTeac = () => {
        setisAccount(false);
        setisStud(false);
        setisTeach(true);
        setisQuery(false)
        arightRef.current.style.display = "none";
        brightRef.current.style.display = "flex";
        crightRef.current.style.display = "none";
        drightRef.current.style.display = "none";
    }
    const handleStud = () => {
        setisAccount(false);
        setisStud(true);
        setisTeach(false);
        setisQuery(false)
        arightRef.current.style.display = "none";
        brightRef.current.style.display = "none";
        crightRef.current.style.display = "flex";
        drightRef.current.style.display = "none";
    }
    const handleQuery = () => {
        setisAccount(false);
        setisStud(false);
        setisTeach(false);
        setisQuery(true)
        arightRef.current.style.display = "none";
        brightRef.current.style.display = "none";
        crightRef.current.style.display = "none";
        drightRef.current.style.display = "flex";
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        Navigate('/')
    }

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
                role: `${role}`
            }
        }
        axios.post("http://localhost:3000/profile", {}, header).then((res) => {
            console.log(res.data.data)
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={AP.adminProfile}>
            <div className={AP.left}>
                <div onClick={handleAccount} className={`${AP.left1} ${isAccount ? AP.selectedOne : ''}`}>Account</div>
                <div onClick={handleTeac} className={`${AP.left1} ${isTeach ? AP.selectedOne : ''}`}>Registered Teacher</div>
                <div onClick={handleStud} className={`${AP.left1} ${isStud ? AP.selectedOne : ''}`}>Registered Student</div>
                <Link to='/signup' className={`${AP.left1} ${AP.left2}`}>Register a Member</Link>
                <div onClick={handleQuery} className={`${AP.left1} ${isQuery ? AP.selectedOne : ''}`}>Query</div>
                <div onClick={handleLogOut} className={`${AP.left1} ${AP.left2}`}>Log Out</div>
                <Link to='/' className={`${AP.left1} ${AP.left3}`}>Home</Link>
            </div>
            <div className={AP.right}>
                <div ref={arightRef} className={AP.aright}>
                    {userData.Registration_ID} {userData.fName} {userData.lName} {userData.email} {userData.address}
                    <div className={AP.update} onClick={() => Navigate('/updatedata', { state: userData })}>Update Data</div>
                </div>
                <div ref={brightRef} className={AP.bright}>Right 2</div>
                <div ref={crightRef} className={AP.cright}>Right 3</div>
                <div ref={drightRef} className={AP.dright}>Right 4</div>
            </div>
        </div>
    )
}