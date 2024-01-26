import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteReservation } from '../services/reservationsApi';

const useDeleteReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useQueryClient();

  const { mutate: deleteReserved, isPending: isDeleting } = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      console.log('delete Reserved');
      query.invalidateQueries({ active: true });

    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { deleteReserved, isDeleting };
};

export default useDeleteReservation;
