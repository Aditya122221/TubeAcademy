import { useEffect, useState } from 'react';
import SP from '../../CSS/StudentProfile.module.css';
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function StudentRightOne() {
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))
    const [userData, setUserData] = useState([])

    const fetchData = () => {
        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
                role: `${role}`
            }
        }
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {}, header).then((res) => {
            console.log(res.data.data)
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (userData.avatar === "") setUserData({ ...userData, avatar: TeamLeader })

    return (
        <div className={SP.rightone}>
            <div className={SP.card}>
                <div className={SP.leftContainer}>
                    <img className={SP.profile} alt="Profile" src={userData.avatar} />
                    <h2 className={SP.gradienttext}>{userData.fName} {userData.lName}</h2>
                    <button className={SP.rightOneButton} onClick={() => Navigate('/updatedata', { state: userData })}>Update Profile</button>
                </div>
                <div className={SP.rightContainer}>
                    <h3 className={SP.gradienttext}>Profile Details</h3>
                    <table className={SP.table}>
                        <tr>
                            <td className={SP.td}>Registration ID :</td>
                            <td className={SP.td}>{userData.Registration_ID}</td>
                        </tr>
                        <tr>
                            <td className={SP.td}>Name :</td>
                            <td className={SP.td}>{userData.fName} {userData.lName}</td>
                        </tr>
                        <tr>
                            <td className={SP.td}>Mobile :</td>
                            <td className={SP.td}>{userData.pNumber}</td>
                        </tr>
                        <tr>
                            <td className={SP.td}>Email :</td>
                            <td className={SP.td}>{userData.email}</td>
                        </tr>
                        <tr>
                            <td className={SP.td}>Address :</td>
                            <td className={SP.td}>{userData.address}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}