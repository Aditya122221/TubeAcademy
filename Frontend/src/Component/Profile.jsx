import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import P from '../CSS/Profile.module.css'
import Leader from '../Images/TeamLeader.png'

const Profile = () => {
    const Navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    const [settingUp, setSettingUp] = useState(false);
    const [userData, setUserData] = useState('')

    const accountRef = useRef(null)
    const saveRef = useRef(null)
    const editRef = useRef(null)
    const editingfName = useRef(null)
    const editinglName = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    })

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('https://tube-academy-server.vercel.app/profile', {}, header).then((res) => {
            setSettingUp(false);
            console.log("Data fetched");
            setUserData(res.data.data);
        }).catch((err) => {
            console.log("Error while fetching the data", err)
            setSettingUp(false)
        })
    }

    console.log(userData)

    useEffect(() => {
        fetchData()
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('token');
        Navigate('/')
    }

    const HandleEdit = () => {
        accountRef.current.style.backgroundColor = "white";
        accountRef.current.style.color = "black";
        saveRef.current.style.display = "inline-block";
        editRef.current.style.backgroundColor = "blue";
        editRef.current.style.color = "white";
        editingfName.current.style.pointerEvents = "fill";
        editinglName.current.style.pointerEvents = "fill";
    }

    const HandleAccount = () => {
        accountRef.current.style.backgroundColor = "blue";
        accountRef.current.style.color = "white";
        saveRef.current.style.display = "none";
        editRef.current.style.backgroundColor = "white";
        editRef.current.style.color = "black";
        editingfName.current.style.pointerEvents = "none";
        editinglName.current.style.pointerEvents = "none";
    }

    const handleSave = () => {
        accountRef.current.style.backgroundColor = "blue";
        accountRef.current.style.color = "white";
        saveRef.current.style.display = "none";
        editRef.current.style.backgroundColor = "white";
        editRef.current.style.color = "black";
        editingfName.current.style.pointerEvents = "none";
        editinglName.current.style.pointerEvents = "none";
    }
    return (
        <div className={P.Profile}>
            <div className={P.ProfileHeader}>
                <div className={P.left}>
                    <div className={P.left1}>
                        <img src={Leader} alt="Account Image" className={P.accountImg} />
                        <div className={P.left2}>
                            <div className={P.left3}>{userData.fName} {userData.lName}</div>
                            <div className={P.left4}>{userData.email}</div>
                        </div>
                    </div>
                    <div className={P.left5}>
                        <div ref={accountRef} onClick={HandleAccount} className={`${P.left6} ${P.initial}`}>
                            <span className="material-symbols-outlined llee">
                                account_circle
                            </span>
                            <div className={P.left7}>Account</div>
                        </div>
                        <div ref={editRef} onClick={HandleEdit} className={P.left6}>
                            <span className="material-symbols-outlined llee">
                                edit
                            </span>
                            <div className={P.left9}>Edit</div>
                        </div>
                        <button onClick={handleLogOut} className={P.left10}>
                            <span className="material-symbols-outlined llee">
                                logout
                            </span>
                            <div className={P.left11}>Log Out</div>
                        </button>
                        <div className={P.bottom}>
                            <Link to='/' className={P.back}>Home</Link>
                        </div>
                    </div>
                </div>
                <div className={P.right}>
                    <div className={P.hSave}>
                        <h1 className={P.right1}>Account Setting</h1>
                        <button ref={saveRef} onClick={handleSave} className={P.save}>Save</button>
                    </div>
                    <div className={P.right2}>
                        <div className={P.right3}>
                            <div className={P.right4}>
                                <div className={P.right5}>First Name</div>
                                <input type="text" name="firstname" className={`${P.right6} ${P.inputt}`} ref={editingfName} value={userData.fName} />
                            </div>
                            <div className={P.right7}>
                                <div className={P.right8}>Last Name</div>
                                <input type="text" name="lasttname" className={`${P.right9} ${P.inputt}`} ref={editinglName} value={userData.lName} />
                            </div>
                        </div>
                        <div className={P.right3}>
                            <div className={P.right4}>
                                <div className={P.right5}>Email</div>
                                <input type="email" name="email" className={`${P.right6} ${P.inputt}`} disabled value={userData.email} />
                            </div>
                            <div className={P.right7}>
                                <div className={P.right8}>Phone Number</div>
                                <input type="text" name="lasttname" className={`${P.right9} ${P.inputt}`} value={userData.pNumber} />
                            </div>
                        </div>
                        <div className={P.right11}>
                            <div className={P.right12}>Address</div>
                            <textarea value={userData.address} disabled className={P.right13}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
