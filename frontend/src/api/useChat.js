import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchData } from './fetchData';
import { jwtDecodeToken, removeToken } from './axiosHelper';

const decoded = jwtDecodeToken();

export const useCreateChat = function () {
   const queryClient = useQueryClient();
   const { mutate: createChat, isPending } = useMutation({
      mutationFn: (data) =>
         fetchData(
            {
               url: `/message/create-new-chat`,
               method: 'POST',
               data,
            },
            false
         ),
      onSuccess: () => queryClient.invalidateQueries(['chat-list']),

      onError: (data) => {
         toast.error(data?.message);
      },
   });

   return { createChat, isPending };
};

export const useCreateMsg = function () {
   const queryClient = useQueryClient();
   const { mutate: createNewMsg, isPending: isCreateMsgPending } = useMutation({
      mutationFn: (data) =>
         fetchData(
            {
               url: `/message/create-message`,
               method: 'POST',
               data,
            },
            false
         ),

      // onSuccess: () => queryClient.invalidateQueries(['chat-messages']),
   });

   return { createNewMsg, isCreateMsgPending };
};

export const useGetChatList = function (userId) {
   const { data: chatList, isPending: isGetChatListPending } = useQuery({
      queryKey: ['chat-list', userId],
      queryFn: () =>
         fetchData(
            {
               url: `/message/get-chat-list`,
               method: 'POST',
               data: { userId },
            },
            false
         ),
      enabled: !!userId,
   });

   return { chatList, isGetChatListPending };
};

export const useGetChatMsg = function (reciverId, senderId, page) {
   const { data: currentChatMsg, isLoading: isGetChatMsgPending } = useQuery({
      queryKey: ['chat-messages', reciverId, page],
      queryFn: () =>
         fetchData(
            {
               url: `/message/get-chat/${reciverId}/${page}`,
               method: 'POST',
               data: {
                  senderId,
               },
            },
            false
         ),
      enabled: !!reciverId && !!senderId,
   });

   return { currentChatMsg, isGetChatMsgPending };
};
