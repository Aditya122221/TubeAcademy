import { useEffect, useState } from "react"
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from "react-router-dom"
import TP from '../../CSS/TeacherProfile.module.css'
import axios from "axios";

var RegId;

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

    RegId = userData.Registration_ID

    return (
        <div className={TP.rightone}>
            <div className={TP.card}>
                <div className={TP.leftContainer}>
                    <img
                        src={userData.avatar}
                        alt="Profile Image" className={TP.profile}
                    />
                    <h2 className={TP.gradienttext}>{userData.fName} {userData.lName}</h2>
                    <button className={TP.rightOneButton} onClick={() => Navigate('/updatedata', { state: userData })}>Update Profile</button>
                </div>
                <div className={TP.rightContainer}>
                    <h3 className={TP.gradienttext}>Profile Details</h3>
                    <table className={TP.table}>
                        <tr>
                            <td className={TP.td}>Registration ID :</td>
                            <td className={TP.td}>{userData.Registration_ID}</td>
                        </tr>
                        <tr>
                            <td className={TP.td}>Name :</td>
                            <td className={TP.td}>{userData.fName} {userData.lName}</td>
                        </tr>
                        <tr>
                            <td className={TP.td}>Mobile :</td>
                            <td className={TP.td}>{userData.pNumber}</td>
                        </tr>
                        <tr>
                            <td className={TP.td}>Email :</td>
                            <td className={TP.td}>{userData.email}</td>
                        </tr>
                        <tr>
                            <td className={TP.td}>Address :</td>
                            <td className={TP.td}>{userData.address}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export { RegId }