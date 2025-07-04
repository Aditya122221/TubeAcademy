import { useState } from "react";
import { User, MessageSquare, Home} from 'lucide-react';
import SP from "../CSS/StudentProfile.module.css";
import { useNavigate } from "react-router-dom";
import StudentRightOne from "../JSX/StudentUI/StudentRightOne";
import StudentRightTwo from "../JSX/StudentUI/StudentRightTwo";

export default function StudentProfile() {
  const Navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const handleHomeNavigation = () => {
    Navigate('/home')
  };

  return (
    <div className={SP.container}>
      {/* Header */}
      <div className={SP.header}>
        <div className={SP.headerContent}>
          <h1 className={SP.title}>Student Profile</h1>
          <button
            className={SP.homeButton}
            onClick={handleHomeNavigation}
          >
            <Home className={SP.homeIcon} />
            Back to Home
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={SP.navButtons}>
        <button
          className={`${SP.navButton} ${activeSection === 'profile' ? SP.navButtonActive : SP.navButtonInactive
            }`}
          onClick={() => setActiveSection('profile')}
        >
          <User className={SP.navIcon} />
          Profile Details
        </button>
        <button
          className={`${SP.navButton} ${activeSection === 'queries' ? SP.navButtonActive : SP.navButtonInactive
            }`}
          onClick={() => setActiveSection('queries')}
        >
          <MessageSquare className={SP.navIcon} />
          Query History
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'profile' && <StudentRightOne />}
      {activeSection === 'queries' && <StudentRightTwo />}
    </div>
  );
}
