import React from "react";
import N from '../CSS/Navbar.module.css';
import { Link } from "react-router-dom";
import Logo from '../Images/logo.png';

export default function Navbar() {
    const tk = localStorage.getItem('token')
    if (tk === null) {
        return (
            <div className={N.navbar}>
                <input type="checkbox" id={N.check} />
                <label htmlFor="check" className={N.checkbtn}>
                    <span className="material-symbols-outlined" id={N.ham}>menu</span>
                </label>
                <Link to='/'><img src={Logo} alt="Logo" className={N.logo} /></Link>
                <div className={N.menu}>
                    <Link to='/' className={N.s}>Home</Link>
                    <Link to='/about' className={N.s}>About</Link>
                    <Link to='/contact' className={N.s}>Contact</Link>
                    <Link to='/login' className={N.s}>Login</Link>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={N.navbar}>
                <input type="checkbox" id={N.check} />
                <label htmlFor="check" className={N.checkbtn}>
                    <span className="material-symbols-outlined" id={N.ham}>menu</span>
                </label>
                <Link to='/'><img src={Logo} alt="Logo" className={N.logo} /></Link>
                <div className={N.menu}>
                    <Link to='/' className={N.s}>Home</Link>
                    <Link to='/about' className={N.s}>About</Link>
                    <Link to='/contact' className={N.s}>Contact</Link>
                    <Link to='/profile' className={N.s}>Profile</Link>
                </div>
            </div>
        )
    }
}

/* <div className="search-container">
<input type="text" name="search" placeholder="Search..." className="search-input" />
<i className="fas fa-search"></i>
</div> */
