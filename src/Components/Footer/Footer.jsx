
import React from 'react';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './App.css'; // Import your main CSS file
import './Footer.css'
const App = () => {
    // const location = useLocation();
    // const [isFooterVisible, setIsFooterVisible] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //         const scrollPercentage = (scrollPosition / pageHeight) * 100;

    //         if (scrollPercentage >= 25) {
    //             setIsFooterVisible(true);
    //         } else {
    //             setIsFooterVisible(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [location]);

    return (
        <div >
            {/* Your existing Router setup */}
            {/* Your existing Routes setup */}
            <footer className={`footerr`}>
                <p>&copy; 2024 Aero-Management. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
