// App.js
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Room from './components/Room';
import Navbar from './components/Navbar';
import NewRoom from './components/NewRoom';
import NewCategory from './components/NewCategory';
import { fetchCategories, saveFormData } from './redux/rooms/actions';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        throw new Error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await saveFormData(formData);
    } catch (error) {
      throw new Error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Room categories={categories} />} />
          {/* Render NewRoom component with the Route component */}
          <Route path="/new-room" element={<NewRoom categories={categories} handleFormSubmit={handleFormSubmit} />} />
          <Route path="/new-category" element={<NewCategory />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
