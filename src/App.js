import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { setToken } from './redux/userAuth/authSlice';
import NewRoom from './components/NewRoom';
import NewCategory from './components/NewCategory';
// import { fetchCategories } from './redux/rooms/actions';
import Category from './components/Category';
import Reservations from './pages/Reservations';
import Navbar from './components/Navbar';
import CategoryDetail from './components/CategoryDetail';
import DeleteRoom from './components/DeleteRoom';
import { listRooms } from './redux/rooms/roomSlice';
import { getCategory, listCategories } from './redux/categories/categorySlice';
// import Sidebar from './components/Sidebar';

const App = () => {
  const { id } = useParams();
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');

    if (token) {
      dispatch(setToken({ username, token }));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const categoriesData = await fetchCategories();
  //       setCategories(categoriesData);
  //     } catch (error) {
  //       throw new Error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleFormSubmit = async (formData) => {
  //   try {
  //     await saveFormData(formData);
  //   } catch (error) {
  //     throw new Error('Error submitting form:', error);
  //   }
  // };

  return (
    <div className="grid grid-cols-[0.25fr,1fr] bg-[#f9fafb]">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Category />} />
        <Route path="/newroom" element={<NewRoom />} />
        <Route path="/show-rooms" element={<Category />} />
        <Route path="/add-category" element={<NewCategory />} />
        <Route path="/category_details/:id" element={<CategoryDetail />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/delete_room" element={<DeleteRoom />} />
      </Routes>
    </div>
  );
};

export default App;
