import { useState } from 'react';
import N from '../CSS/Navbar.module.css'
import { Link } from 'react-router-dom'
import Logo from '../Images/Logo.png'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={N.navbar} role="navigation" aria-label="Main navigation">
            <div className={N.navbarContainer}>
                <div className={N.navbarLogo}>
                    <Link to='/home'>
                        <img
                        src={Logo}
                        alt="Logo"
                        className={N.logoImage}
                    />
                    </Link>
                </div>

                <div className={`${N.navbarMenu} ${isMenuOpen ? N.active : ''}`}>
                    <ul className={N.navbarNav} role="menubar">
                        <li className={N.navItem} role="none">
                            <Link
                                to="/home"
                                className={N.navLink}
                                role="menuitem"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={N.navItem} role="none">
                            <Link
                                to="/askai"
                                className={N.navLink}
                                role="menuitem"
                                onClick={closeMenu}
                            >
                                AskAI
                            </Link>
                        </li>
                        <li className={N.navItem} role="none">
                            <Link
                                to="/contact"
                                className={N.navLink}
                                role="menuitem"
                                onClick={closeMenu}
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li className={N.navItem} role="none">
                            <Link
                                to="/profile"
                                className={N.navLink}
                                role="menuitem"
                                onClick={closeMenu}
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    className={`${N.hamburger} ${isMenuOpen ? N.active : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="navbarMenu"
                >
                    <span className={N.hamburgerLine}></span>
                    <span className={N.hamburgerLine}></span>
                    <span className={N.hamburgerLine}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className={N.navbarOverlay}
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
};