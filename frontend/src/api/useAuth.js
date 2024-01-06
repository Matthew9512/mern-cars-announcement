import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';
import { jwtDecodeToken, removeToken } from './axiosHelper';

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

export const useGetSeller = function (id) {
   const { data } = useQuery({
      queryKey: ['seller', id],
      queryFn: () =>
         fetchData(
            {
               url: `user/seller/${id}`,
            },
            false
         ),

      enabled: !!id,
   });

   return { data };
};

export const useGetUser = function () {
   const decoded = jwtDecodeToken();

   const { data, isPending, error } = useQuery({
      queryKey: ['user', decoded?.id],
      queryFn: () =>
         fetchData(
            {
               url: `user/${decoded?.id}`,
            },
            true
         ),
      enabled: !!decoded?.id,
   });

   return { data, isPending, error };
};

export const useUpdateUserData = function (id) {
   const {
      mutate: mutateUserData,
      isPending,
      error,
   } = useMutation({
      mutationFn: (data) =>
         fetchData(
            {
               url: `user/update-user/${id}`,
               method: 'PATCH',
               data,
            },
            true
         ),
      onSuccess: (data) => toast.success(data?.message),
      onError: (err) => toast.error(err.message),
   });

   return { mutateUserData, isPending, error };
};

export const useLogout = (id) => {
   const { mutate: logout, isPending: logoutLoading } = useMutation({
      mutationFn: () =>
         fetchData(
            {
               url: `/user/logout/${id}`,
            },
            true
         ),

      onSuccess: (data) => {
         toast.success(data?.message);
         removeToken();
         setTimeout(() => {
            window.location = '/';
         }, 500);
      },
      onError: (err) => toast.error(err?.message),
   });

   return { logout, logoutLoading };
};

export const useDeleteUser = (id) => {
   const { mutate: deleteAcc, isPending: deleteLoading } = useMutation({
      mutationFn: () =>
         fetchData(
            {
               url: `/user/delete/${id}`,
               method: 'DELETE',
            },
            true
         ),

      onSuccess: (data) => {
         toast.success(data?.message);
         removeToken();
         setTimeout(() => {
            window.location = '/';
         }, 500);
      },
      onError: (err) => toast.error(err?.message),
   });

   return { deleteAcc, deleteLoading };
};

export const useGetUserAds = function (announcements) {
   const queries = useQueries({
      queries: announcements
         ? announcements.map((id) => {
              return {
                 queryKey: ['user', id],
                 queryFn: () => fetchData({ url: `offer/${id}` }),
              };
           })
         : [],
   });

   return queries;
};

export const useOfferStatus = function () {
   const queryClient = useQueryClient();
   const { mutate: mutateOfferStatus } = useMutation({
      mutationFn: ({ endpoint, body }) =>
         fetchData(
            {
               url: endpoint,
               method: 'POST',
               data: {
                  body,
               },
            },
            true
         ),

      onSuccess: (data) => {
         toast.success(data?.message);
         queryClient.invalidateQueries(['user']);
      },

      onError: (err) => toast.error(err.message),
   });

   return mutateOfferStatus;
};
