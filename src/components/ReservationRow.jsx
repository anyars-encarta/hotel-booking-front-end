import { useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { format } from 'date-fns';

import PropTypes from 'prop-types';
import ReservationMenu from './ReservationMenu';

const ReservationRow = ({ room: { name }, date, user: { username, email } }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className=" relative grid grid-col-[0.6fr,2fr,2.4fr,1.4fr,1fr,3.2rem] grid-cols-[1fr,1fr,1fr,0.2fr] text-center  place-items-center gap-4 items-start border-t border-gray-200 dark:border-[#374151] py-4">
      <span>{name}</span>
      <p className=" flex flex-col text-sm">
        <span>{username}</span>
        <span>{email}</span>
      </p>
      <p className=" flex flex-col text-sm">
        <span>
          {format(new Date(date), 'MMM dd, yyyy')}
        </span>
      </p>

      <button type="button" className=" items-end text-right" onClick={() => setShowMenu((prev) => !prev)}>
        {' '}
        <HiEllipsisVertical className="w-full text-2xl text-gray-500 text-right  cursor-pointer items-end" id="id" />
      </button>
      { showMenu && <ReservationMenu setShowMenu={setShowMenu} /> }
    </li>
  );
};

ReservationRow.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReservationRow;
