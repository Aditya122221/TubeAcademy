import React from "react";
import F from '../CSS/Footer.module.css';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className={F.footer}>
                <div className={F.footerHeader}></div>
                <div className={F.footerFooter}>
                    <div className={F.copyright}>&copy; 2024 TubeAcademy</div>
                    <div className={F.lang}>
                        <i className="fa-solid fa-globe"></i>
                        <span className={F.l}>English</span>
                    </div>
                    <Link to='/' className={F.term}>Terms & Privacy</Link>
                    <div className={F.soccc}>
                        <i className={`fa-brands fa-square-x-twitter ${F.ll}`}></i>
                        <i className={`fa-brands fa-linkedin ${F.ll}`}></i>
                        <i className={`fa-brands fa-instagram ${F.ll}`}></i>
                        <i className={`fa-brands fa-facebook ${F.ll}`}></i>
                        <i className={`fa-brands fa-youtube ${F.ll}`}></i>
                    </div>
                </div>
            </div>
        </>
    );
}