import { useState, useEffect } from 'react'
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'
import { GraduationCap } from 'lucide-react'

export default function AdminRightTwo() {
	const [teacherData, setTeacherData] = useState([])

	const fetchData = () => {
		axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/api/teacherDetails`
		)
			.then((res) => {
				setTeacherData(res.data.data)
			})
			.catch((err) => {
				console.log('Error while fetching the data', err)
			})
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className={AP.section}>
			<div className={AP.sectionHeader}>
				<h2>
					<GraduationCap size={28} />
					Teachers Management
				</h2>
			</div>
			<div className={AP.tableContainer}>
				<table className={AP.dataTable}>
					<thead>
						<tr>
							<th>Registration ID</th>
							<th>Name</th>
							<th>Phone Number</th>
							<th>Email</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
                        {teacherData && teacherData.map((teacher, index) => (
                            <tr key={index} className={AP.teacherDet}>
                                <td className={AP.fontMedium}>{teacher.Registration_ID}</td>
                                <td>
                                    {teacher.fName} {teacher.lName}
                                </td>
                                <td>{teacher.pNumber}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.address}</td>
                            </tr>
                        ))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
