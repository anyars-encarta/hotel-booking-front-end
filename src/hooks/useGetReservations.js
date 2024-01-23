import { useQuery } from '@tanstack/react-query';
import getReservations from '../services/reservationsApi';

const useGetReservations = () => {
  const { isPending, error, data: reservations } = useQuery({
    queryFn: getReservations,
    queryKey: ['reservations'],
  });
  return { isPending, error, reservations };
};

export default useGetReservations;
