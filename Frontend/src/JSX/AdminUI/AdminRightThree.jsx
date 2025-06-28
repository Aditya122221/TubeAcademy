import { useState, useEffect } from 'react'
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'
import { Users } from 'lucide-react'

export default function AdminRightThree() {
	const [studentData, setStudentData] = useState([])

	const fetchData = () => {
		axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/api/studentDetails`
		)
			.then((res) => {
				setStudentData(res.data.data)
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
					<Users size={28} />
					Students Management
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
						{studentData &&
							studentData.map((student, index) => (
								<tr
									key={index}
									className={AP.teacherDet}
								>
									<td
										className={
											AP.fontMedium
										}
									>
										{
											student.Registration_ID
										}
									</td>
									<td>
										{student.fName}{' '}
										{student.lName}
									</td>
									<td>{student.pNumber}</td>
									<td>{student.email}</td>
									<td>{student.address}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
