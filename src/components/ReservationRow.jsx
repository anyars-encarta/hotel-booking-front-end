import { useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';

const ReservationRow = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className=" relative grid grid-col-[0.6fr,2fr,2.4fr,1.4fr,1fr,3.2rem] grid-cols-4 text-center  place-items-center gap-4 items-start border-t border-gray-200 dark:border-[#374151] py-4">
      <span>name</span>
      <p className=" flex flex-col text-sm">
        <span>full_name</span>
        <span>email</span>
      </p>
      <p className=" flex flex-col text-sm">
        <span>
          night stay
        </span>
      </p>

      <button type="button" className=" items-end text-right" onClick={() => setShowMenu((prev) => !prev)}>
        {' '}
        <HiEllipsisVertical className="w-full text-2xl text-gray-500 text-right  cursor-pointer items-end" id="id" />
      </button>
    </li>
  );
};

export default ReservationRow;
