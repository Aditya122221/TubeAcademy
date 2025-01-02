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

        axios.post("/api/profile", {}, header).then((res) => {
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    if(userData.avatar === "") setUserData({...userData, avatar: TeamLeader})

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
        <div className={AP.rigthOne}>
            <div className={AP.aaa}>
                <div className={AP.td}>Account Details</div>
                <img className={AP.profile} src={userData.avatar} alt="ProfilePhoto" />
            </div>
            <div className={AP.account}>
                {userData.Registration_ID} {userData.fName} {userData.lName} {userData.email} {userData.address}
                <div className={AP.update} onClick={() => Navigate('/updatedata', { state: userData })}>Update Data</div>
            </div>
        </div>
    )
}