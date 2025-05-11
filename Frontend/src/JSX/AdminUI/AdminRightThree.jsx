import React, { useState, useEffect } from "react"
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'

export default function AdminRightThree() {
    const [studentData, setStudentData] = useState([])

    const fetchData = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/studentDetails`).then((res) => {
            setStudentData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={AP.rightThree}>
            <div className={AP.brightOne}>
                <h2 className={AP.tetd}>Student Details</h2>
                <div className={AP.Ttdd}>
                    <table className={`${AP.brightTwo} ${AP.ttable}`}>
                        <tr className={AP.TableHead}>
                            <td className={AP.teacher}>Registration ID</td>
                            <td className={AP.teacher}>Name</td>
                            <td className={AP.teacher}>Phone Number</td>
                            <td className={AP.teacher}>Email</td>
                            <td className={AP.teacher}>Address</td>
                        </tr>
                        {studentData && studentData.map((teacher, index) => (
                            <tr key={index} className={AP.teacherDet}>
                                <td className={AP.ttd}>{teacher.Registration_ID}</td>
                                <td className={AP.ttd}>
                                    {teacher.fName} {teacher.lName}
                                </td>
                                <td className={AP.ttd}>{teacher.pNumber}</td>
                                <td className={AP.ttd}>{teacher.email}</td>
                                <td className={AP.ttd}>{teacher.address}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}