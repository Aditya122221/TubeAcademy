import { useState } from 'react'
import {User, Users, GraduationCap, MessageCircle, Home, UserPlus} from 'lucide-react'
import AP from '../CSS/AdminProfile.module.css'
import { useNavigate } from 'react-router-dom'
import AdminRightOne from '../JSX/AdminUI/AdminRightOne'
import AdminRightTwo from '../JSX/AdminUI/AdminRightTwo'
import AdminRightThree from '../JSX/AdminUI/AdminRightThree'
import AdminRightFour from '../JSX/AdminUI/AdminRightFour'

export default function AdminProfile() {
	const [activeTab, setActiveTab] = useState('profile')
	const Navigate = useNavigate()

	const query = {
		queryID: 185632,
		regis: 785641,
		name: 'Sarah Johnson',
		email: 'aditya@gmail.com',
		message: 'Login Issues',
		qdate: '2024-06-25',
		resolution: 'Issue solved',
		rdate: '2024-06-29',
		status: 'pending',
	}

	return (
		<div className={AP.adminDashboard}>
			<div className={AP.container}>
				{/* Header */}
				<div className={AP.header}>
					<div className={AP.headerContent}>
						<div className={AP.headerText}>
							<h1>Dashboard</h1>
						</div>

						{/* Action Buttons */}
						<div className={AP.actionButtons}>
							<button
                                className={`${AP.btn} ${AP.btnPrimary}`} onClick={() => Navigate('/home')}>
								<Home
									size={18}
								/>
								Home
							</button>
							<button
                                className={`${AP.btn} ${AP.btnSecondary}`}
                                onClick={() =>
										Navigate('/signup')
									}
							>
								<UserPlus size={18} />
								Register Member
							</button>
						</div>
					</div>
				</div>

				{/* Navigation Section */}
				<div className={AP.navigationSection}>
					<div className={AP.navContainer}>
						<div className={AP.navTabs}>
							{[
								{
									id: 'profile',
									label: 'Profile',
									icon: User,
								},
								{
									id: 'teachers',
									label: 'Teachers',
									icon: GraduationCap,
								},
								{
									id: 'students',
									label: 'Students',
									icon: Users,
								},
								{
									id: 'queries',
									label: 'Queries',
									icon: MessageCircle,
								},
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() =>
										setActiveTab(tab.id)
									}
									className={`${
										AP.navTab
									} ${
										activeTab === tab.id
											? AP.active
											: ''
									}`}
								>
									<div
										className={
											AP.tabContent
										}
									>
										<div
											className={
												AP.tabInfo
											}
										>
											<tab.icon
												size={
													20
												}
											/>
											<span
												className={
													AP.tabLabel
												}
											>
												{
													tab.label
												}
											</span>
										</div>
										{tab.count && (
											<div
												className={
													AP.tabCount
												}
											>
												{
													tab.count
												}
											</div>
										)}
									</div>
									{activeTab === tab.id && (
										<div
											className={
												AP.activeIndicator
											}
										></div>
									)}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Content Sections */}
				<div className={AP.contentContainer}>
					{/* Profile Section */}
					{activeTab === 'profile' && <AdminRightOne />}

					{/* Teachers Section */}
					{activeTab === 'teachers' && (
						<AdminRightTwo />
					)}

					{/* Students Section */}
					{activeTab === 'students' && (
						<AdminRightThree />
					)}

					{/* Queries Section */}
					{activeTab === 'queries' && (
						<AdminRightFour />
					)}
				</div>
			</div>
		</div>
	)
}
