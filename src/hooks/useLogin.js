import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authApi';

const useLogin = () => {
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: () => {
      console.log('Logged in');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { loginUser, isPending };
};

export default useLogin;
