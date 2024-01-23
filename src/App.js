import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import { setToken } from './redux/userAuth/authSlice';
import Room from './components/Room';
import NewRoom from './components/NewRoom';
import NewCategory from './components/NewCategory';
import { fetchCategories, saveFormData } from './redux/rooms/actions';
import Category from './components/Category';

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
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Room categories={categories} />} />
        <Route path="/new-room" element={<NewRoom categories={categories} handleFormSubmit={handleFormSubmit} />} />
        <Route path="/category" element={<Category />} />
        <Route path="/new-category" element={<NewCategory />} />
      </Routes>
    </div>
  );
};

export default App;
