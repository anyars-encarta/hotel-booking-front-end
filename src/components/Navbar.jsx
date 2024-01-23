import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className=" h-screen md:static dark:bg-[#18212F] dark:text-white shadow-sm  p-10">
    <ul className=" space-y-3 ">
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white md:hidden">
        <NavLink className=" flex items-center gap-2">
          <span>Logout</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="dashboard" className=" flex items-center gap-2">
          <span>Home</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="login" className=" flex items-center gap-2">
          <span>Login</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="show-rooms" className=" flex items-center gap-2">
          <span>Rooms</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="newroom" className=" flex items-center gap-2">
          <span>New room</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="reservations" className=" flex items-center gap-2">
          <span className=" font-semibold">Reservations</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
