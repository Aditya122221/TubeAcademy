import { useState, useEffect } from 'react'
import AP from '../../CSS/AdminProfile.module.css'
import TeamLeader from '../../Images/TeamLeader.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { User, Edit3 } from 'lucide-react'

export default function AdminRightOne() {
	const [userData, setUserData] = useState('')
	const token = JSON.parse(localStorage.getItem('token'))
	const role = JSON.parse(localStorage.getItem('role'))
	const Navigate = useNavigate()

	const fetchData = () => {
		const header = {
			headers: {
				Authorization: `Bearer ${token}`,
				role: `${role}`,
			},
		}

		axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/api/profile`,
			{},
			header
		)
			.then((res) => {
				setUserData(res.data.data)
			})
			.catch((err) => {
				console.log('Error while fetching the data', err)
			})
	}

	if (userData.avatar === '')
		setUserData({ ...userData, avatar: TeamLeader })

	useEffect(() => {
		fetchData()
	}, [])

	const handleLogOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		Navigate('/')
	}

	return (
		<div className={AP.section}>
			<div className={AP.sectionHeader}>
				<h2>
					<User size={28} />
					Profile Information
				</h2>
				<button
					className={`${AP.btn} ${AP.btnPrimary}`}
					onClick={() =>
						Navigate('/updatedata', { state: userData })
					}
				>
					<Edit3 size={16} />
					Update Profile
				</button>
				<button className={`${AP.btn} ${AP.btnPrimary}`} onClick={handleLogOut}>
					<Edit3 size={16} />
					Log out
				</button>
			</div>
			<div className={AP.profileContent}>
				<div className={AP.profileImageSection}>
					<div className={AP.profileImageContainer}>
						<img
							src={userData.avatar}
							alt="Admin Profile"
							className={AP.profileImage}
						/>
					</div>
				</div>
				<div className={AP.profileDetails}>
					<div className={AP.detailsGrid}>
						<div
							className={`${AP.detailCard} ${AP.personalInfo}`}
						>
							<h4>Personal Information</h4>
							<div className={AP.detailItems}>
								<div className={AP.detailItem}>
									<label>
										Registration No
									</label>
									<p>
										{
											userData.Registration_ID
										}
									</p>
								</div>
								<div className={AP.detailItem}>
									<label>Full Name</label>
									<p>
										{userData.fName}{' '}
										{userData.lName}
									</p>
								</div>
								<div className={AP.detailItem}>
									<label>Address</label>
									<p>{userData.address}</p>
								</div>
							</div>
						</div>
						<div
							className={`${AP.detailCard} ${AP.contactInfo}`}
						>
							<h4>Contact Information</h4>
							<div className={AP.detailItems}>
								<div className={AP.detailItem}>
									<label>
										Email Address
									</label>
									<p>{userData.email}</p>
								</div>
								<div className={AP.detailItem}>
									<label>
										Phone Number
									</label>
									<p>{userData.pNumber}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
