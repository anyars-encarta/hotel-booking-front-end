import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
// import Sidebar from './components/Sidebar';
import { setToken } from './redux/userAuth/authSlice';
import Room from './components/Room';
import NewRoom from './components/NewRoom';
import { fetchCategories, saveFormData } from './redux/actions';
import Category from './components/Category';
import Reservations from './pages/Reservations';
import Navbar from './components/Navbar';

const App = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');

    if (token) {
      dispatch(setToken({ username, token }));
    }
  }, [dispatch]);

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
    <div className="grid grid-cols-[0.25fr,1fr] bg-[#f9fafb]">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Room categories={categories} />} />
        <Route path="/newroom" element={<NewRoom categories={categories} handleFormSubmit={handleFormSubmit} />} />
        <Route path="/category" element={<Category />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </div>
  );
};

export default App;
