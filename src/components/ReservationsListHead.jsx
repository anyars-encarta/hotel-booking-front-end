import React from 'react';

const ReservationsListHead = () => (
  <div className="grid items-start text-center grid-cols-[0.6fr,2fr,2.4fr,1.4fr,1fr,3.2rem] bg-[#F9FAFB] dark:bg-[#111827] gap-4 p-4">
    <p className=" font-semibold uppercase text-[#626C71]">Room</p>
    <p className=" font-semibold uppercase text-[#626C71]">User</p>
    <p className=" font-semibold uppercase text-[#626C71]">dates</p>
    <p className=" font-semibold uppercase text-[#626C71]">status</p>
    <p className=" font-semibold uppercase text-[#626C71]">amount</p>
    <p className=" font-semibold uppercase text-[#626C71]" />
  </div>
);

export default ReservationsListHead;
