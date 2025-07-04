import { useEffect, useState } from 'react';
import { User, Edit, LogOut, Phone, Mail, MapPin, Hash } from 'lucide-react';
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
            setUserData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (userData.avatar === "") setUserData({ ...userData, avatar: TeamLeader })
    
    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        Navigate("/");
    };
    
    const handleUpdate = () => {
        Navigate('/updatedata', { state: userData })
    }

    return (
        <div className={SP.contentCard}>
            <h2 className={SP.sectionTitle}>
                <User className={SP.sectionIcon} />
                Profile Details
            </h2>

            <div className={SP.profileGrid}>
                <div className={SP.profileField}>
                    <label className={SP.fieldLabel}>
                        <Hash className={SP.fieldIcon} />
                        Registration ID
                    </label>
                    <div className={SP.fieldValue}>{userData.Registration_ID}</div>
                </div>

                <div className={SP.profileField}>
                    <label className={SP.fieldLabel}>
                        <User className={SP.fieldIcon} />
                        Full Name
                    </label>
                    <div className={SP.fieldValue}>{userData.fName} {userData.lName}</div>
                </div>

                <div className={SP.avatarSection}>
                    <div className={SP.fieldLabel}>Profile Picture</div>
                    <img
                            src={userData.avatar}
                            alt="User Avatar"
                            className={SP.avatar}
                        />
                </div>

                <div className={SP.profileField}>
                    <label className={SP.fieldLabel}>
                        <Mail className={SP.fieldIcon} />
                        Email Address
                    </label>
                    <div className={SP.fieldValue}>{userData.email}</div>
                </div>

                <div className={SP.profileField}>
                    <label className={SP.fieldLabel}>
                        <Phone className={SP.fieldIcon} />
                        Phone Number
                    </label>
                    <div className={SP.fieldValue}>{userData.pNumber}</div>
                </div>

                <div className={`${SP.profileField} ${SP.addressField}`}>
                    <label className={SP.fieldLabel}>
                        <MapPin className={SP.fieldIcon} />
                        Address
                    </label>
                    <div className={SP.fieldValue}>{userData.address}</div>
                </div>
            </div>

            <div className={SP.buttonGroup}>
                <button
                    className={`${SP.button} ${SP.updateButton}`}
                    onClick={handleUpdate}
                >
                    <Edit className={SP.buttonIcon} />
                    Update Profile
                </button>
                <button
                    className={`${SP.button} ${SP.logoutButton}`}
                    onClick={handleLogOut}
                >
                    <LogOut className={SP.buttonIcon} />
                    Logout
                </button>
            </div>
        </div>
    )
}