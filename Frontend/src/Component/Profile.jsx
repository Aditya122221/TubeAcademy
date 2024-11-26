import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import P from '../CSS/Profile.module.css'
import AdminProfile from "./AdminProfile";
import Leader from '../Images/TeamLeader.png'
import TeacherProfile from "./TeacherProfile";
import StudentProfile from "./StudentProfile";

const Profile = () => {
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/gotLost';
        }
    })

    if (localStorage.getItem('role') === '"admin"') {
        return (
            <AdminProfile />
        )
    }
    else if (localStorage.getItem('role') === '"Teacher"') {
        return (
            <TeacherProfile />
        )
    }
    else if (localStorage.getItem('role') === '"Student"') {
        return (
            <StudentProfile />
        )
    }
}

export default Profile;