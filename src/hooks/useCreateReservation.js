import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateReservation } from '../services/reservationsApi';

const useCreateReservation = () => {
  const query = useQueryClient();
  const { mutate: reserveRoom, isPending } = useMutation({
    mutationFn: (data) => CreateReservation(data),
    onSuccess: () => {
      query.invalidateQueries({ active: true });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { reserveRoom, isPending };
};

export default useCreateReservation;
