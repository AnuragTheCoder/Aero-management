import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Explore from './Components/Explore';
import About from './Components/About';
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Header from './Components/Header';
import Registration from './Components/Registration/Registration';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Components/Context/UserContext';
import Login from './Components/Registration/Login';
import AdminPanel from './Components/AdminPanel/AdminPanel';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Header />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/explore" element={<Explore />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
