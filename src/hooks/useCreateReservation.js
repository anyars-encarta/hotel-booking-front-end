import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateReservation } from '../services/reservationsApi';


const useCreateReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const query = useQueryClient();
  const { mutate: reserveRoom, isPending } = useMutation({
    mutationFn: (data) => CreateReservation(data),
    onSuccess: () => {
      console.log('Reserved');
      query.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { reserveRoom, isPending };
};

export default useCreateReservation;
