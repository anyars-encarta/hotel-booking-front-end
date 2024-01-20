import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Room from './components/Room';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Room />} />
      </Routes>
    </Router>
  </>
);

export default App;
