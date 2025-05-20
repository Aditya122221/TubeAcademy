import { useEffect } from "react";
import StudentHomePage from "./StudentHomePage";
import Navbar from "../JSX/Navbar";
import AdminHomePage from "./AdminHomePage";
import TeacherHomePage from "./TeacherHomePage";

export default function HomePage() {
    const role = localStorage.getItem('role');
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/';
        }
    }, [])

    if (role === '"Student"') {
        return (
            <>
                <Navbar />
                <StudentHomePage />
            </>
        )
    }
    else if (role === '"Teacher"') {
        return (
            <>
                <Navbar />
                <TeacherHomePage />
            </>
        )
    }
    else {
        return (
            <>
                <Navbar />
                <AdminHomePage />
            </>
        )
    }
}