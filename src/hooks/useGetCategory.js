import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getCategory } from '../services/reservationsApi';

const useGetCategory = () => {
  const { id } = useParams();
  const { data: category, isPending: isGettingRooms, error } = useQuery({
    queryFn: () => getCategory(id),
    queryKey: ['category', id],
  });
  return { category, isGettingRooms, error };
};

export default useGetCategory;
