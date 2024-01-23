import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import { setToken } from './redux/userAuth/authSlice';
import NewRoom from './components/NewRoom';
import { fetchCategories, saveFormData } from './redux/rooms/actions';
import Category from './components/Category';
import CategoryDetail from './components/CategoryDetail';

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
        <Route path="/" element={<Category />} />
        <Route path="/newroom" element={<NewRoom categories={categories} handleFormSubmit={handleFormSubmit} />} />
        <Route path="/show-rooms" element={<Category />} />
        <Route path="/category_details/:id" element={<CategoryDetail />} />
      </Routes>
    </div>
  );
};

export default App;
