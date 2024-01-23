import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul className="nav-items">
    <li><NavLink to="/" className="link">Delete Room</NavLink></li>
    <li><NavLink to="/add-rooms" className="link">Add Room</NavLink></li>
    <li><NavLink to="/add-category" className="link">Add Category</NavLink></li>
    <li><NavLink to="/category" className="link">Category</NavLink></li>
  </ul>
);

export default Navbar;
