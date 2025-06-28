import { useEffect, useState } from "react"
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from "react-router-dom"
import TP from '../../CSS/TeacherProfile.module.css'
import axios from "axios";
import { User, LogOut, Edit3,  Mail, Phone, MapPin, IdCard } from "lucide-react"

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

    const handleLogOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		Navigate('/')
	}

    RegId = userData.Registration_ID

    return (
        <div className={`${TP.section} ${TP.profileSection}`}>
          <div className={TP.sectionHeader}>
            <h2><User size={24} />Profile Details</h2>
          </div>

          <div className={TP.profileContent}>
            <div className={TP.profileCard}>
              <div className={TP.profileHeader}>
                <div className={TP.profileImageContainer}>
                  <img
                    src={userData.avatar}
                    alt="Teacher Profile"
                    className={TP.profileImage}
                  />
                </div>
                <div className={TP.profileHeaderInfo}>
                            <h3>{userData.fName} { userData.lName}</h3>
                  <div className={TP.registrationId}>
                    <IdCard size={16} /> ID: {userData.Registration_ID}
                  </div>
                </div>
              </div>
            </div>

            <div className={TP.profileDetailsGrid}>
              <div className={TP.detailCard}>
                <div className={TP.detailIcon}>
                  <Mail size={20} />
                </div>
                <div className={TP.detailContent}>
                  <label>Email Address</label>
                  <p>{userData.email}</p>
                </div>
              </div>

              <div className={TP.detailCard}>
                <div className={TP.detailIcon}>
                  <Phone size={20} />
                </div>
                <div className={TP.detailContent}>
                  <label>Phone Number</label>
                  <p>{userData.pNumber}</p>
                </div>
              </div>

              <div className={TP.detailCard}>
                <div className={TP.detailIcon}>
                  <MapPin size={20} />
                </div>
                <div className={TP.detailContent}>
                  <label>Address</label>
                  <p>{userData.address}</p>
                </div>
              </div>
            </div>

            <div className={TP.profileActions}>
              <button className={`${TP.btn} ${TP.btnPrimary}`} onClick={() =>
						Navigate('/updatedata', { state: userData })
					}>
                <Edit3 size={16} />
                Update Profile
              </button>
              <button className={`${TP.btn} ${TP.btnSecondary}`} onClick={handleLogOut}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
    )
}

export { RegId }