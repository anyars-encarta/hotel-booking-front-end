import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className=" h-screen md:static dark:bg-[#18212F] dark:text-white shadow-sm  p-10">
    <ul className=" space-y-3 ">
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white md:hidden">
        <NavLink className=" flex items-center gap-2">
          <span className=" font-semibold">Logout</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="/" className=" flex items-center gap-2">
          <span className=" font-semibold">Home</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="show-rooms" className=" flex items-center gap-2">
          <span className=" font-semibold">Rooms</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="newroom" className=" flex items-center gap-2">
          <span className=" font-semibold">New room</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="delete_room" className=" flex items-center gap-2">
          <span className=" font-semibold">Delete room</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="reservations" className=" flex items-center gap-2">
          <span className=" font-semibold">Reservations</span>
        </NavLink>
      </li>
      <li className="px-3 py-2 hover:bg-blue-500 hover:text-white">
        <NavLink to="logout" className=" flex items-center gap-2">
          <span className=" font-semibold">Logout</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
