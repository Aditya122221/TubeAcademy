import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('http://localhost:3000/profile', {}, header).then((res) => {
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
    return (
        <div className="profile">
            <Link to='/'>Home</Link>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Profile;
