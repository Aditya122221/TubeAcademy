import React, { useSatae, useRef, useState } from "react";
import N from '../CSS/Navbar.module.css';
import { Link } from "react-router-dom";
import Logo from '../Images/Logo.png';

export default function Navbar() {
    const [isActiveH, setIsActiveH] = useState(false);
    const [isActiveN, setIsActiveN] = useState(false)


    function mobileMenu() {
        setIsActiveH(!setIsActiveH)
        setIsActiveN(!isActiveN)
    }

    function closeMenu() {
        setIsActiveH(false)
        setIsActiveN(false)
    }
    return (
        <div className={N.navbarr}>
            <header className={N.header}>
                <nav className={N.navbar}>
                    <Link to='/home' className={N.navLogo}>
                        <img src={Logo} alt="Logo" className={N.logo} />
                    </Link>
                    <ul className={`${N.navMenu} ${isActiveN ? N.active : ""}`}>
                        <li className={N.navItem}>
                            <Link to="/home" onClick={closeMenu} className={N.navLink}>Home</Link>
                        </li>
                        <li className={N.navItem}>
                            <Link to="/askai" onClick={closeMenu} className={N.navLink}>Ask AI</Link>
                        </li>
                        <li className={N.navItem}>
                            <Link to="/contact" onClick={closeMenu} className={N.navLink}>Contact Us</Link>
                        </li>
                        <li className={N.navItem}>
                            <Link to='/profile' onClick={closeMenu} className={N.navLink}>Profile</Link>
                        </li>
                    </ul>
                    <div onClick={mobileMenu} className={`${N.hamburger} ${isActiveH ? N.active : ""}`}>
                        <span className={N.bar}></span>
                        <span className={N.bar}></span>
                        <span className={N.bar}></span>
                    </div>
                </nav>
            </header>
        </div>
    )
}

/* <div className="search-container">
<input type="text" name="search" placeholder="Search..." className="search-input" />
<i className="fas fa-search"></i>
</div> */