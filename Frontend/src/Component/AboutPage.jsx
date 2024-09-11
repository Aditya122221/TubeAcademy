import React from "react";
import A from '../CSS/About.module.css';
import Navbar from '../JSX/Navbar';
import Footer from '../JSX/Footer';

export default function AboutPage() {
    return (
        <div className={A.AboutMain}>
            <Navbar />
            <div className={A.about}>
                <div className={A.aa}>
                    <div className={A.iicc}>
                        <i className={`fa-regular fa-user ${A.uusseerr}`}></i>
                    </div>
                    <div className={A.iinn}>
                        <div className={A.Name}>I am, Aditya Kumar</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}