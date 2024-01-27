import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { setToken } from './redux/userAuth/authSlice';
import NewRoom from './components/NewRoom';
import NewCategory from './components/NewCategory';
import Category from './components/Category';
import Reservations from './pages/Reservations';
import CategoryDetail from './components/CategoryDetail';
import DeleteRoom from './components/DeleteRoom';
import { listRooms } from './redux/rooms/roomSlice';
import { listCategories } from './redux/categories/categorySlice';
import AppLayout from './components/AppLayout';
import ProetectedRoutes from './ProetectedRoutes';

const App = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listRooms());
    dispatch(listCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCategory(id));
  // }, [dispatch, id]);

  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');

    if (token) {
      dispatch(setToken({ username, token }));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={(
          <ProetectedRoutes>
            <AppLayout />
          </ProetectedRoutes>
          )}
        >
          <Route path="/" element={<Category />} />
          <Route path="/newroom" element={<NewRoom />} />
          <Route path="/show-rooms" element={<Category />} />
          <Route path="/add-category" element={<NewCategory />} />
          <Route path="/category_details/:id" element={<CategoryDetail />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/delete-room" element={<DeleteRoom />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
