import React, { useState, useRef, useEffect } from "react"
import AP from '../../CSS/AdminProfile.module.css'
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function AdminRightOne() {
    const [userData, setUserData] = useState('')
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))
    const Navigate = useNavigate()

    const ImageRef = useRef()

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
                role: `${role}`
            }
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {}, header).then((res) => {
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    if (userData.avatar === "") setUserData({ ...userData, avatar: TeamLeader })

    useEffect(() => {
        fetchData()
    }, [])

    const LargerImage = () => {
        if (ImageRef.current.style.height === "2cm") {
            ImageRef.current.style.height = "18cm"
            ImageRef.current.style.width = "18cm"
            ImageRef.current.style.borderRadius = "0"
        } else {
            ImageRef.current.style.height = "2cm"
            ImageRef.current.style.width = "2cm"
            ImageRef.current.style.borderRadius = "50%"
        }
    }


    return (
        <div className={AP.rightone}>
            <div className={AP.card}>
                <div className={AP.leftContainer}>
                    <img
                        src={userData.avatar}
                        alt="Profile Image" className={AP.profile}
                    />
                    <h2 className={AP.gradienttext}>{userData.fName} {userData.lName}</h2>
                    <button className={AP.rightOneButton} onClick={() => Navigate('/updatedata', { state: userData })}>Update Profile</button>
                </div>
                <div className={AP.rightContainer}>
                    <h3 className={AP.gradienttext}>Profile Details</h3>
                    <table className={AP.otable}>
                        <tr>
                            <td className={AP.otd}>Registration ID :</td>
                            <td className={AP.otd}>{userData.Registration_ID}</td>
                        </tr>
                        <tr>
                            <td className={AP.otd}>Name :</td>
                            <td className={AP.otd}>{userData.fName} {userData.lName}</td>
                        </tr>
                        <tr>
                            <td className={AP.otd}>Mobile :</td>
                            <td className={AP.otd}>{userData.pNumber}</td>
                        </tr>
                        <tr>
                            <td className={AP.otd}>Email :</td>
                            <td className={AP.otd}>{userData.email}</td>
                        </tr>
                        <tr>
                            <td className={AP.otd}>Address :</td>
                            <td className={AP.otd}>{userData.address}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}