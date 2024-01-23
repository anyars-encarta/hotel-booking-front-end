import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul className="nav-items">
    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active link' : 'pending link')}>Delete Room</NavLink></li>
    <li><NavLink to="/new-room" className="link">Add Room</NavLink></li>
    <li><NavLink to="/new-category" className="link">Add Category</NavLink></li>   
    <li><NavLink to="/category" className="link">Category</NavLink></li>
  </ul>
);

export default Navbar;
