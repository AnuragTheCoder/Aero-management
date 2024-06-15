import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css'; // Corrected import statement
import { useAuth } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [activeLink, setActiveLink] = React.useState(location.pathname);
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');

    }


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
                        {user === null && <span className='text-sm'>Register/Login To Explore</span>}
                        {user !== null && <span>Explore</span>}
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
                {
                    user != null &&

                    <p className='w-[60px] flex flex-col  mx-6 items-center gap-2'>
                        <Link
                            to="/myflights"
                            className="bg-blue-600 p-4 text-sm text-gray-100  max-w-[300px] truncate text-center rounded-lg hover:bg-blue-800"
                            onClick={() => handleLinkClick('/myflights')}
                        >
                            <span>{user.name}&nbsp;Flights</span>
                        </Link>

                        <button className='bg-red-400 rounded-lg p-4  text-white hover:bg-red-700' onClick={handleLogout}>
                            Logout
                        </button>
                    </p>

                }
                {
                    user === null && <p className='w-[60px] mx-7 flex flex-col items-center gap-2'>
                        <Link
                            to="/register"
                            className="bg-blue-600 p-4 hover:bg-blue-800 rounded-lg"
                            onClick={() => handleLinkClick('/myflights')}
                        >
                            <span>Register</span>
                        </Link>

                        <Link to='/login' className='bg-green-400 rounded-lg hover:bg-red-700 p-4 text-white' >
                            Login
                        </Link>
                    </p>
                }
            </ul>
        </div>
    );
};

export default Navbar;
