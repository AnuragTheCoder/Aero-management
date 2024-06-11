import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css'; // Corrected import statement

const Navbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = React.useState(location.pathname);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return (
        <div className={styles.nav}> {/* Apply styles.nav here */}
            <div className={styles['nav-logo']}>Aero-Management</div> {/* Apply styles.nav-logo */}
            <ul className={styles['nav-menu']}> {/* Apply styles.nav-menu */}
                <li>
                    <Link
                        to="/"
                        className={activeLink === '/' ? styles.active : ''}
                        onClick={() => handleLinkClick('/')}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/explore"
                        className={activeLink === '/explore' ? styles.active : ''}
                        onClick={() => handleLinkClick('/explore')}
                    >
                        Explore
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className={activeLink === '/about' ? styles.active : ''}
                        onClick={() => handleLinkClick('/about')}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className={activeLink === '/contact' ? `${styles.active} ${styles['nav-contact']}` : styles['nav-contact']}
                        onClick={() => handleLinkClick('/contact')}
                    >
                        Contact us
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
