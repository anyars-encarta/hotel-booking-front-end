import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => (
  <div className="grid grid-cols-[0.25fr,1fr] bg-[#f9fafb]">
    <Navbar />
    <Outlet />
  </div>
);

export default AppLayout;
