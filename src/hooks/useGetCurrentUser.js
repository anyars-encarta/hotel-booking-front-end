import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/reservationsApi';

const useGetCurrentUser = () => {
  const { data: currentUser, isPending, error } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
  });

  return { currentUser, isPending, error };
};

export default useGetCurrentUser;
