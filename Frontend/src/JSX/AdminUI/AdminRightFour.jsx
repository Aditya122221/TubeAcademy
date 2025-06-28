import { useState, useEffect } from 'react'
import AP from '../../CSS/AdminProfile.module.css'
import axios from 'axios'
import { MessageCircle } from 'lucide-react'

export default function AdminRightFour() {
	const [query, setQuery] = useState([])

	const fetchData = () => {
		axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/queryAll`)
			.then((res) => {
				setQuery(res.data.data)
			})
			.catch((err) => {
				console.log(
					'Error while fetching the data from client side',
					err
				)
			})
	}

	useEffect(() => {
		fetchData()
	}, [])

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case 'resolved':
				return AP.statusSuccess
			case 'pending':
				return AP.statusWarning
			default:
				return AP.statusDefault
		}
	}
	return (
		<div className={AP.section}>
			<div className={AP.sectionHeader}>
				<h2>
					<MessageCircle size={28} />
					Query Management
				</h2>
			</div>
			<div className={AP.tableContainer}>
				<table className={AP.dataTable}>
					<thead>
						<tr>
							<th>Query ID</th>
							<th>Registration ID</th>
							<th>Name</th>
							<th>Email ID</th>
							<th>Message</th>
							<th>Query Date</th>
							<th>Resolution</th>
							<th>Resolution Date</th>
						</tr>
					</thead>
					<tbody>
						{query &&
							query.map((q, index) => (
								<tr
									key={index}
									className={`${getStatusColor(q.status)}`}
								>
									<td>{q.query_ID}</td>
									<td>{q.Registration_ID}</td>
									<td>{q.fullname}</td>
									<td>{q.email}</td>
									<td>{q.message}</td>
									<td>{q.queryDate}</td>
									<td>
										{q.replyMessage}
									</td>
									<td>{q.resolveDate}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
