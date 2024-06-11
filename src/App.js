import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Explore from './Components/Explore';
import About from './Components/About';
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Header from './Components/Header';
import Registration from './Components/Registration/Registration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
