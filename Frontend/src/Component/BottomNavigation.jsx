import { Link, useLocation } from 'react-router-dom';
import BN from '../CSS/BottomNavigation.module.css';

const navItems = [
  { label: 'Class 9', path: '/classnine' },
  { label: 'Class 10', path: '/classten' },
  { label: 'Class 11', path: '/classeleven' },
  { label: 'Class 12', path: '/classtwelve' },
];

export default function BottomNavigation(){
  const location = useLocation();

  return (
    <nav className={BN.bottomNav}>
      <div className={BN.bottomNavContainer}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${BN.navItem} ${location.pathname === item.path ? BN.active : ''}`}
          >
            <span className={BN.navLabel}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};