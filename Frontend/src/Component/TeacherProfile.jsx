import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TP from '../CSS/TeacherProfile.module.css'
import axios from "axios";

export default function TeacherProfile() {
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))

    const [isAccount, setisAccount] = useState(true)
    const [isUpload, setisUpload] = useState(false);
    const [userData, setUserData] = useState('');

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

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
                role: `${role}`
            }
        }
        axios.post("/api/profile", {}, header).then((res) => {
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={TP.adminProfile}>
            <div className={TP.left}>
                <div onClick={handleAccount} className={`${TP.left1} ${isAccount ? TP.selectedOne : ''}`}>Account</div>

                <div onClick={handleUpload} className={`${TP.left1} ${isUpload ? TP.selectedOne : ''}`}>Upload Video</div>

                <div onClick={handleLogOut} className={`${TP.left1} ${TP.left2}`}>Log Out</div>

                <Link to='/' className={`${TP.left1} ${TP.left3}`}>Home</Link>
            </div>
            <div className={TP.right}>
                <div ref={arightRef} className={TP.aright}>
                    <div className={TP.Tthh}>Account Details</div>
                    <div className={TP.account}>
                        {userData.Registration_ID} {userData.fName} {userData.lName} {userData.email} {userData.address}
                        <div className={TP.update} onClick={() => Navigate('/updatedata', { state: userData })}>Update Data</div>
                    </div>
                </div>
                <div ref={brightRef} className={TP.bright}>
                    <div className={TP.Tthh}>Upload Video</div>
                    <div className={TP.account}>
                        <form className={TP.form}>
                            <input className={TP.input} type="text" placeholder="Enter the title for the video" required />
                            <select className={TP.select}>
                                <option className={TP.option} value="">--- Select Subject ---</option>
                                <option className={TP.option} value="Mathematics">Mathematics</option>
                                <option className={TP.option} value="Physics">Physics</option>
                                <option className={TP.option} value="Chemistry">Chemistry</option>
                                <option className={TP.option} value="Biology">Biology</option>
                            </select>
                            <select className={TP.select}>
                                <option className={TP.option} value="">--- Select Class ---</option>
                                <option className={TP.option} value="IX">IX</option>
                                <option className={TP.option} value="X">X</option>
                                <option className={TP.option} value="XI">XI</option>
                                <option className={TP.option} value="XII">XII</option>
                            </select>
                            <label className={TP.label}>Submit Thumbnail</label>
                            <input className={TP.file} type="file" />
                            <label className={TP.label}>Submit Video</label>
                            <input className={TP.file} type="file" />
                            <button className={TP.button} type="submit">Upload Video</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}