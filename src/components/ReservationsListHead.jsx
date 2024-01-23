import React from 'react';

const ReservationsListHead = () => (
  <div className="grid items-start text-center grid-col-[0.6fr,2fr,2.4fr,1.4fr,1fr,3.2rem] grid-cols-[1fr,1fr,1fr,0.2fr] bg-[#F9FAFB] dark:bg-[#111827] gap-4">
    <p className=" font-semibold uppercase text-[#626C71]">Room</p>
    <p className=" font-semibold uppercase text-[#626C71]">User</p>
    <p className=" font-semibold uppercase text-[#626C71]">dates</p>
  </div>
);

export default ReservationsListHead;
