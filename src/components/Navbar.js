import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul className="nav-items">
    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active link' : 'pending link')}>Update Room</NavLink></li>
    <li><NavLink to="/newroom" className="link">Add Room</NavLink></li>
    <li><NavLink to="/category" className="link">Category</NavLink></li>
  </ul>
);

export default Navbar;
