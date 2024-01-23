import React from 'react';
import ReservationsListHead from './ReservationsListHead';
import ReservationRow from './ReservationRow';
import useGetReservations from '../hooks/useGetReservations';

const ReservationsList = () => {
  const { isPending, error, reservations } = useGetReservations();

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <div className="">
      <ReservationsListHead />
      <ul className="bg-white dark:bg-[#18212F]">
        {
          reservations.map((reservation) => {
            const { room, user, city } = reservation;
            return <ReservationRow key={reservation.id} room={room} city={city} user={user} />;
          })
        }
      </ul>
    </div>
  );
};

export default ReservationsList;
