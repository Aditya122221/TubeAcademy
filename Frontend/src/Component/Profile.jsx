import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const [settingUp, setSettingUp] = useState(false);
    const [userData, setUserData] = useState('')

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

    console.log(setUserData)

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <h1></h1>
    )
}

export default Profile;