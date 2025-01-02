import React, { useState, useRef, useEffect } from "react"
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'

export default function AdminRightTwo() {
    const [teacherData, setTeacherData] = useState([])

    const fetchData = () => {
        axios.post("/api/teacherDetails").then((res) => {
            setTeacherData(res.data.data)
        }).catch((err) => {
            console.log("Error while fetching the data", err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={AP.rightTwo}>
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
    )
}