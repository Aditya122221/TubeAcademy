import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import P from '../CSS/Profile.module.css'
import Leader from '../Images/TeamLeader.png'

const Profile = () => {
    const Navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    const [settingUp, setSettingUp] = useState(false);
    const [userData, setUserData] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/';
        }
    })

    // const fetchData = () => {
    //     const header = {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }
    //     axios.post('http://localhost:3000/profile', {}, header).then((res) => {
    //         setSettingUp(false);
    //         console.log("Data fetched");
    //         setUserData(res.data.data);
    //     }).catch((err) => {
    //         console.log("Error while fetching the data", err)
    //         setSettingUp(false)
    //     })
    // }

    // console.log(userData)

    // useEffect(() => {
    //     fetchData()
    // }, [])

    const handleLogOut = () => {
        localStorage.removeItem('token');
        Navigate('/')
    }
    return (
        <div className={P.Profile}>
            <div className={P.ProfileHeader}>
                <div className={P.left}>
                    <div className={P.left1}>
                        <img src={Leader} alt="Account Image" className={P.accountImg} />
                        <div className={P.left2}>
                            <div className={P.left3}>Aditya Kumar</div>
                            <div className={P.left4}>adityakumar122221@gmail.com</div>
                        </div>
                    </div>
                    <div className={P.left5}>
                        <div className={P.left6}>
                            <span class="material-symbols-outlined llee">
                                account_circle
                            </span>
                            <div className={P.left7}>Account</div>
                        </div>
                        <div className={P.left6}>
                            <span class="material-symbols-outlined llee">
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
                    <h1 className={P.right1}>Account Setting</h1>
                    <div className={P.right2}>
                        <div className={P.right3}>
                            <div className={P.right4}>
                                <div className={P.right5}>First Name</div>
                                <input type="text" name="firstname" className={P.right6} disabled />
                            </div>
                            <div className={P.right7}>
                                <div className={P.right8}>Last Name</div>
                                <input type="text" name="lasttname" className={P.right9} disabled />
                            </div>
                        </div>
                        <div className={P.right3}>
                            <div className={P.right4}>
                                <div className={P.right5}>Email</div>
                                <input type="email" name="email" className={P.right6} disabled />
                            </div>
                            <div className={P.right7}>
                                <div className={P.right8}>Phone Number</div>
                                <input type="text" name="lasttname" className={P.right9} disabled />
                            </div>
                        </div>
                        <div className={P.right11}>
                            <div className={P.right12}>Address</div>
                            <textarea className={P.right13} disabled></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
