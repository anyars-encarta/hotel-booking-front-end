import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteReservation } from '../services/reservationsApi';

const useDeleteReservation = () => {
  const query = useQueryClient();

  const { mutate: deleteReserved, isPending: isDeleting } = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      query.invalidateQueries({ active: true });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { deleteReserved, isDeleting };
};

export default useDeleteReservation;
