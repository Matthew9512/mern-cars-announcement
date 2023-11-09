import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './fetchData';

export const useAddNewOffer = function () {
   const navigate = useNavigate();
   const { mutate, isPending } = useMutation({
      mutationFn: ({ carData, sellerData }) =>
         fetchData(
            {
               url: `/offer/new-offer`,
               method: 'POST',
               data: {
                  carData,
                  sellerData,
               },
            },
            true
         ),
      onSuccess: (data) => {
         toast.success(data?.message);
         setTimeout(() => {
            navigate(`/offer/${data?.offerId}`);
         }, 1200);
      },
      onError: (data) => {
         toast.error(data?.message);
      },
   });

   return { mutate, isPending };
};

export const useGetOffer = function (id) {
   const { data, isPending, error } = useQuery({
      queryKey: ['carOffer', id],
      queryFn: () =>
         fetchData({
            url: `offer/${id}`,
         }),
   });

   return { data, isPending, error };
};

export const useSearchOffer = function (searchParams) {
   const endpoint = !searchParams.size ? `/features` : `/q?${searchParams}`;
   const { data, isPending, error } = useQuery({
      queryKey: ['featuresOffer', endpoint],
      queryFn: () =>
         fetchData({
            url: `/offer${endpoint}`,
         }),
   });

   return { data, isPending, error };
};
