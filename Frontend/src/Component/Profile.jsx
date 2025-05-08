import React, { useEffect } from "react";
import AdminProfile from "./AdminProfile";
import TeacherProfile from "./TeacherProfile";
import StudentProfile from "./StudentProfile";
import P from '../CSS/Profile.module.css'

const Profile = () => {
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/';
        }
    })

    if (localStorage.getItem('role') === '"admin"') {
        return (
            <div className={P.mmm}>
                <AdminProfile />
            </div>
        )
    }
    else if (localStorage.getItem('role') === '"Teacher"') {
        return (
            <TeacherProfile />
        )
    }
    else if (localStorage.getItem('role') === '"Student"') {
        return (
            <div className={P.mmm}>
                <StudentProfile />
            </div>
        )
    }
}

export default Profile;