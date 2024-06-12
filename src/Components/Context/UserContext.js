// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const UserContext = createContext();



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Function to verify the token and load user data
        const verifyToken = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    // Verify the token with the backend
                    const response = await axios.post(
                        'http://127.0.0.1:4000/api/auth/verifyToken',
                        { token },
                        { withCredentials: true }
                    );
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        // Call verifyToken when component mounts
        verifyToken();
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
