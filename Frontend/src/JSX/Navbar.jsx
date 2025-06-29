import { useState } from "react";
import N from '../CSS/Navbar.module.css';
import { Link } from "react-router-dom";
import Logo from '../Images/Logo.png';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    const menuItems = [
        ["Home", "/home"],
        ["Ask AI", "/askai"],
        ["Contact", "/contact"],
        ["Profile", "/profile"]
    ];


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (item) => {
        setActiveItem(item);
        setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
    };
    return (
        <nav className={N.navbar}>
            <div className={N.navbarContainer}>
                {/* Logo */}
                <div className={N.navbarLogo}>
                    <Link to="/home">
                        <img src={Logo} alt="logo" width="60px" height="60px" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className={N.navbarMenu}>
                    {menuItems.map((item) => (
                        <li key={item} className={N.navbarItem}>
                            <Link
                                to={item[1]}
                                className={`${N.navbarLink} ${activeItem === item ? N.active : ''}`}
                                tabIndex="0"
                            >
                                {item[0]}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <div className={N.navbarToggle} onClick={toggleMobileMenu}>
                    <button
                        className={N.hamburger}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        tabIndex="0"
                    >
                        <span className={`${N.hamburgerLine} ${isMobileMenuOpen ? N.active : ''}`}></span>
                        <span className={`${N.hamburgerLine} ${isMobileMenuOpen ? N.active : ''}`}></span>
                        <span className={`${N.hamburgerLine} ${isMobileMenuOpen ? N.active : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${N.mobileMenu} ${isMobileMenuOpen ? N.active : ''}`}>
                <ul className={N.mobileMenuItems}>
                    {menuItems.map((item) => (
                        <li key={item} className={N.mobileMenuItem}>
                            <Link
                                to={item[1]}
                                className={`${N.mobileMenuLink} ${activeItem === item ? N.active : ''}`}
                                tabIndex="0"
                            >
                                {item[0]}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>

    )
}

/* <div className="search-container">
<input type="text" name="search" placeholder="Search..." className="search-input" />
<i className="fas fa-search"></i>
</div> */