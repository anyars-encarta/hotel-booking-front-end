import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/mainpage.css';
import logo from '../images/logo.png';
import { logout } from '../redux/userAuth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className=" h-screen md:static dark:bg-[#18212F] dark:text-white shadow-sm  p-10">
      <ul className=" space-y-3 ">
        <img src={logo} alt="Logo" border="0" className="w-40 logo" />

        { isAuthenticated
        && (
        <>
          <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
            <NavLink to="show-rooms" className=" flex items-center gap-2">
              <span className=" font-semibold">Rooms</span>
            </NavLink>
          </li>
          <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
            <NavLink to="add-category" className=" flex items-center gap-2">
              <span className=" font-semibold">Add Category</span>
            </NavLink>
          </li>
          <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
            <NavLink to="newroom" className=" flex items-center gap-2">
              <span className=" font-semibold">Add Room</span>
            </NavLink>
          </li>
          <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
            <NavLink to="delete-room" className=" flex items-center gap-2">
              <span className=" font-semibold">Delete Room</span>
            </NavLink>
          </li>
          <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
            <NavLink to="reservations" className=" flex items-center gap-2">
              <span className=" font-semibold">Reservations</span>
            </NavLink>
          </li>

        </>
        )}
        { isAuthenticated
          ? (
            <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
              <button type="button" className=" font-semibold" onClick={handleLogout}>Logout</button>
            </li>
          )
          : (
            <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
              <NavLink to="login" className=" flex items-center gap-2">
                <span className=" font-semibold">Login</span>
              </NavLink>
            </li>
          )}

        <div className="social-media">
          <div className="social">
            <div className="flex items-center justify-center gap-3">
              <i className="bi bi-facebook text-1xl text-blue-500" />
              <i className="bi bi-twitter-x text-1xl text-blue-400" />
              <i className="bi bi-instagram text-1xl text-pink-600" />
              <i className="bi bi-linkedin text-1xl text-blue-600" />
            </div>
            <p className="text-center text-sm font-semibold text-gray-500 mt-2 dark:text-gray-300">© 2023 All rights reserved.</p>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
