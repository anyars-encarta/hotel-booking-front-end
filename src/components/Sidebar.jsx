import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  MenuItem,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setToken } from '../redux/userAuth/authSlice';

const protectedPages = ['Add Rooms', 'Update Rooms', 'Room Reservation'];

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken({ username: localStorage.getItem('username'), token }));
    }
  }, [dispatch]);

  const generateListItems = (listItems, handleLogout) => listItems.map((item) => (
    <MenuItem
      key={item}
      className="hover:bg-green-500 p-4 rounded-lg"
      role="button"
      onClick={item === 'sign out' ? handleLogout : null}
      tabIndex={0}
    >
      {item === 'sign out' ? (
        item // Render 'sign out' directly inside MenuItem
      ) : (
        <NavLink
          to={`/${item.toLowerCase().replaceAll(' ', '-')}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {item}
        </NavLink>
      )}
    </MenuItem>
  ));

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        height: '100vh',
        padding: '3rem',
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <ul className="flex flex-col gap-2 md:gap-8">
              <li className="hover:bg-green-500 p-4 rounded-lg">
                <NavLink className="text-lg" to="/">
                  Rooms
                </NavLink>
              </li>
              {isAuthenticated
                ? generateListItems(
                  [...protectedPages, 'sign out'],
                  handleLogout,
                )
                : generateListItems(['login', 'sign up'])}
            </ul>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Sidebar;
