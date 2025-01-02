import { useEffect, useState } from "react"
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from "react-router-dom"
import TP from '../../CSS/TeacherProfile.module.css'
import axios from "axios";

export default function TeacherRightOne() {
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))

    const [userData, setUserData] = useState('');

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
    return (
        <div className={TP.rightone}>
            <div className={TP.aaa}>
                <div className={TP.Tthh}>Account Details</div>
                <img className={TP.profile} src={userData.avatar} alt="Profile Photo" />
            </div>
            <div className={TP.account}>
                {userData.Registration_ID} {userData.fName} {userData.lName} {userData.email} {userData.address}
                <div className={TP.update} onClick={() => Navigate('/updatedata', { state: userData })}>Update Data</div>
            </div>
        </div>
    )
}