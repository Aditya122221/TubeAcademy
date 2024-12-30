import React, { useState, useRef, useEffect } from "react"
import AP from '../CSS/AdminProfile.module.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function AdminProfile() {
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))
    const role = JSON.parse(localStorage.getItem('role'))

    const [isAccount, setisAccount] = useState(true)
    const [isTeach, setisTeach] = useState(false)
    const [isStud, setisStud] = useState(false)
    const [isQuery, setisQuery] = useState(false)
    const [userData, setUserData] = useState('')

    const arightRef = useRef()
    const brightRef = useRef()
    const crightRef = useRef()
    const drightRef = useRef()

    const [teacherData, setTeacherData] = useState([])
    const [studentData, setStudentData] = useState([])
    const [query, setQuery] = useState([])

    const handleAccount = () => {
        setisAccount(true)
        setisStud(false)
        setisTeach(false)
        setisQuery(false)
        arightRef.current.style.display = "flex"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "none"
    }
    const handleTeac = () => {
        setisAccount(false)
        setisStud(false)
        setisTeach(true)
        setisQuery(false)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "flex"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "none"
    }
    const handleStud = () => {
        setisAccount(false)
        setisStud(true)
        setisTeach(false)
        setisQuery(false)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "flex"
        drightRef.current.style.display = "none"
    }
    const handleQuery = () => {
        setisAccount(false)
        setisStud(false)
        setisTeach(false)
        setisQuery(true)
        arightRef.current.style.display = "none"
        brightRef.current.style.display = "none"
        crightRef.current.style.display = "none"
        drightRef.current.style.display = "flex"
    }

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        Navigate('/')
    }

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

        axios.post("/api/teacherDetails").then((res) => {
            setTeacherData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })

        axios.post("/api/studentDetails").then((res) => {
            setStudentData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })

        axios.post("/api/queryDetails").then((res) => {
            setQuery(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={AP.adminProfile}>
            <div className={AP.left}>
                <div onClick={handleAccount} className={`${AP.left1} ${isAccount ? AP.selectedOne : ''}`}>Account</div>

                <div onClick={handleTeac} className={`${AP.left1} ${isTeach ? AP.selectedOne : ''}`}>Registered Teacher</div>

                <div onClick={handleStud} className={`${AP.left1} ${isStud ? AP.selectedOne : ''}`}>Registered Student</div>

                <Link to='/signup' className={`${AP.left1} ${AP.left2}`}>Register a Member</Link>

                <div onClick={handleQuery} className={`${AP.left1} ${isQuery ? AP.selectedOne : ''}`}>Query</div>

                <div onClick={handleLogOut} className={`${AP.left1} ${AP.left2}`}>Log Out</div>

                <Link to='/' className={`${AP.left1} ${AP.left3}`}>Home</Link>
            </div>

            {/* -----------------------Account Details--------------------------- */}

            <div className={AP.right}>
                <div ref={arightRef} className={AP.aright}>
                    <div className={AP.td}>Account Details</div>
                    <div className={AP.account}>
                        {userData.Registration_ID} {userData.fName} {userData.lName} {userData.email} {userData.address}
                        <div className={AP.update} onClick={() => Navigate('/updatedata', { state: userData })}>Update Data</div>
                    </div>
                </div>

                {/* ---------------------Teacher Details--------------------- */}

                <div ref={brightRef} className={AP.bright}>
                    <div className={AP.brightOne}>
                        <h2 className={AP.td}>Teacher Details</h2>
                        <div className={AP.Ttdd}>
                            <table className={AP.brightTwo}>
                                <tr className={AP.TableHead}>
                                    <td className={AP.teacher}>Registration ID</td>
                                    <td className={AP.teacher}>Name</td>
                                    <td className={AP.teacher}>Phone Number</td>
                                    <td className={AP.teacher}>Email</td>
                                    <td className={AP.teacher}>Address</td>
                                </tr>
                                {teacherData && teacherData.map((teacher, index) => (
                                    <tr key={index} className={AP.teacherDet}>
                                        <td>{teacher.Registration_ID}</td>
                                        <td>
                                            {teacher.fName} {teacher.lName}
                                        </td>
                                        <td>{teacher.pNumber}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.address}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>

                {/* -------------------------Student Details--------------------- */}

                <div ref={crightRef} className={AP.cright}>
                    <div className={AP.brightOne}>
                        <h2 className={AP.td}>Student Details</h2>
                        <div className={AP.Ttdd}>
                            <table className={AP.brightTwo}>
                                <tr className={AP.TableHead}>
                                    <td className={AP.teacher}>Registration ID</td>
                                    <td className={AP.teacher}>Name</td>
                                    <td className={AP.teacher}>Phone Number</td>
                                    <td className={AP.teacher}>Email</td>
                                    <td className={AP.teacher}>Address</td>
                                </tr>
                                {studentData && studentData.map((teacher, index) => (
                                    <tr key={index} className={AP.teacherDet}>
                                        <td>{teacher.Registration_ID}</td>
                                        <td>
                                            {teacher.fName} {teacher.lName}
                                        </td>
                                        <td>{teacher.pNumber}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.address}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>

                {/* --------------------Query-------------------------------- */}

                <div ref={drightRef} className={AP.dright}>
                    <div className={AP.brightOne}>
                        <h2 className={AP.td}>Queries</h2>
                        <div className={AP.Ttdd}>
                            <table className={AP.brightTwo}>
                                <tr className={AP.TableHead}>
                                    <td className={AP.teacher}>Name</td>
                                    <td className={AP.teacher}>Email ID</td>
                                    <td className={AP.teacher}>Message</td>
                                    <td className={AP.teacher}>Date and Time</td>
                                    <td className={AP.teacher}>Status</td>
                                </tr>
                                {query && query.map((teacher, index) => (
                                    <tr key={index} className={AP.teacherDet}>
                                        <td>
                                            {teacher.fullName}
                                        </td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.message}</td>
                                        <td>{teacher.date}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}