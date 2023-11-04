import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';

export const useRegister = function () {
   const navigate = useNavigate();
   const { mutate, isPending } = useMutation({
      mutationFn: (data) =>
         fetchData(
            {
               url: `/user/register`,
               method: 'POST',
               data,
            },
            false
         ),
      onSuccess: (data) => {
         toast.success(data?.message);
         setTimeout(() => {
            navigate('/login');
         }, 1000);
      },
      onError: (data) => {
         toast.error(data?.message);
      },
   });

   return { mutate, isPending };
};

export const useLogin = function () {
   const { mutate, isPending } = useMutation({
      mutationFn: (data) =>
         fetchData(
            {
               url: `/user/login`,
               method: 'POST',
               data,
            },
            false
         ),
      onSuccess: (data) => {
         localStorage.setItem('car-access__token', JSON.stringify(data?.accessToken));
         toast.success(data?.message);
         setTimeout(() => {
            window.location = '/';
         }, 500);
      },
      onError: (data) => {
         toast.error(data?.message);
      },
   });

   return { mutate, isPending };
};
