import { useState } from 'react';
import L from '../CSS/Navbar.module.css'
import { Link } from 'react-router-dom'
import Logo from '../Images/Logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Ask AI', path: '/askai' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Profile', path: '/profile' },
    ];

    return (
        <nav className={L.navbar}>
            <div className={L.navbarContainer}>
                {/* Logo */}
                <Link to="/" className={L.navbarLogo}>
                    <img src={Logo} alt="logo" width="50px" height="50px"/>
                </Link>

                {/* Desktop Navigation */}
                <div className={L.navbarMenu}>
                    <ul className={L.navbarNav}>
                        {navLinks.map((link, index) => (
                            <li key={index} className={L.navbarItem}>
                                <Link to={link.path} className={L.navbarLink}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Hamburger Menu */}
                <div className={L.navbarToggle} onClick={toggleMenu}>
                    <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
                    <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
                    <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${L.navbarMobile} ${isMenuOpen ? L.active : ''}`}>
                <ul className={L.navbarMobileNav}>
                    {navLinks.map((link, index) => (
                        <li key={index} className={L.navbarMobileItem}>
                            <a
                                href={link.path}
                                className={L.navbarMobileLink}
                                onClick={closeMenu}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;