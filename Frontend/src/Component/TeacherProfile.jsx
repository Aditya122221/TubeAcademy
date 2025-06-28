import { useState } from "react"
import { User, Upload, MessageCircle, Home} from "lucide-react"
import TP from '../CSS/TeacherProfile.module.css'
import TeacherRightOne from "../JSX/TeacherUI/TeacherRightOne"
import TeacherRightThree from "../JSX/TeacherUI/TeacherRightThree"
import TeacherRightTwo from "../JSX/TeacherUI/TeacherRightTwo"
import { useNavigate } from "react-router-dom"

export default function TeacherProfile() {
    const [activeSection, setActiveSection] = useState("profile")
    const Navigate = useNavigate()

    

    return (
        <div className={TP.teacherDashboard}>
            <div className={TP.container}>
                {/* Header */}
                <div className={TP.header}>
                    <div className={TP.headerContent}>
                        <div className={TP.headerText}>
                            {/* <h1>
            Welcome back, {teacherProfile.fullName}
          </h1> */}
                        </div>
                        <button className={`${TP.btn} ${TP.btnHome}`} onClick={() => Navigate('/home')}>
                            <Home size={18} />
                            Go to Home
                        </button>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className={TP.navigationSection}>
                    <div className={TP.navContainer}>
                        <div className={TP.navTabs}>
                            {[
                                { id: "profile", label: "Profile", icon: User },
                                { id: "upload", label: "Upload Video", icon: Upload },
                                { id: "queries", label: "My Queries", icon: MessageCircle },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSection(tab.id)}
                                    className={`${TP.navTab} ${activeSection === tab.id ? TP.active : ""}`}
                                >
                                    <div className={TP.tabContent}>
                                        <tab.icon size={20} />
                                        <span className={TP.tabLabel}>{tab.label}</span>
                                    </div>
                                    {activeSection === tab.id && <div className={TP.activeIndicator}></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className={TP.contentContainer}>
                    {/* Section 1: Profile Details */}
                    {activeSection === "profile" && (
                        <TeacherRightOne />
                    )}

                    {/* Section 2: Upload Video */}
                    {activeSection === "upload" && (
                        <TeacherRightTwo />
                    )}

                    {/* Section 3: Query Section */}
                    {activeSection === "queries" && (
                        <TeacherRightThree />
                    )}
                </div>
            </div>
        </div>

    )
}