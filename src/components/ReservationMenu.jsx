import { HiTrash } from 'react-icons/hi2';

const ReservationMenu = () => (
  <ul className="bg-white  absolute w-[200px] right-[2%]  z-[100] top-[60%] rounded-md shadow-[0_0_5px_rgba(0,0,0,0.2),-0_-0_5px_rgba(0,0,0,0.2)]">
    <li className="flex gap-4 hover:bg-slate-200 py-2 px-4 whitespace-nowrap items-center text-gray-500 cursor-pointer">
      <HiTrash />
      <span>Delete Reservation</span>
    </li>
  </ul>
);

export default ReservationMenu;
