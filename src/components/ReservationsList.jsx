import React from 'react';
import ReservationsListHead from './ReservationsListHead';
import ReservationRow from './ReservationRow';

const ReservationsList = () => (
  <div className="">
    <ReservationsListHead />
    <ul className="bg-white dark:bg-[#18212F]">
      {
          // bookings.map((booking) => (
        <ReservationRow />
          // ))
        }
    </ul>
  </div>
);

export default ReservationsList;
