import React, { useState, useEffect } from "react"
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'

export default function AdminRightFour() {
    const [query, setQuery] = useState([])

    const fetchData = () => {

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
        <div className={AP.rightFour}>
            <div className={AP.brightOne}>
                <h2 className={AP.tetd}>Queries</h2>
                <div className={AP.Ttdd}>
                    <table className={`${AP.brightTwo} ${AP.ttable}`}>
                        <tr className={AP.TableHead}>
                            <td className={AP.teacher}>Name</td>
                            <td className={AP.teacher}>Email ID</td>
                            <td className={AP.teacher}>Message</td>
                            <td className={AP.teacher}>Date and Time</td>
                            <td className={AP.teacher}>Status</td>
                        </tr>
                        {query && query.map((teacher, index) => (
                            <tr key={index} className={AP.teacherDet}>
                                <td className={AP.ttd}>
                                    {teacher.fullName}
                                </td>
                                <td className={AP.ttd}>{teacher.email}</td>
                                <td className={AP.ttd}>{teacher.message}</td>
                                <td className={AP.ttd}>{teacher.date}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}