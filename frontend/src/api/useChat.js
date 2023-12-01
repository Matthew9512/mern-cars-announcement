// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';
// import { fetchData } from './fetchData';
// import { jwtDecodeToken, removeToken } from './axiosHelper';

// const decoded = jwtDecodeToken();

// export const useCreateChat = function () {
//    const { mutate: createChat, isPending } = useMutation({
//       mutationFn: (data) =>
//          fetchData(
//             {
//                url: `/message/new-chat`,
//                method: 'POST',
//                data,
//             },
//             false
//          ),
//       onSuccess: (data) => {
//          toast.success(data?.message);
//       },
//       onError: (data) => {
//          toast.error(data?.message);
//       },
//    });

//    return { createChat, isPending };
// };

// export const useGetChatList = function (userId) {
//    const { data: chatList, isPending } = useQuery({
//       queryKey: ['chat', userId],
//       queryFn: () =>
//          fetchData(
//             {
//                url: `/message/get-chat-list/${userId}`,
//             },
//             false
//          ),
//       enabled: !!userId,
//    });

//    return { chatList, isPending };
// };

// export const useGetChatMsg = function (reciverId, senderId) {
//    console.log(reciverId, senderId);
//    const { data: currentChatMsg, isPending } = useQuery({
//       queryKey: ['chat', reciverId],
//       queryFn: () =>
//          fetchData(
//             {
//                url: `/message/get-chat`,
//                method: 'POST',
//                data: {
//                   senderId,
//                   reciverId,
//                },
//             },
//             false
//          ),
//       enabled: !!reciverId,
//    });

//    return { currentChatMsg, isPending };
// };

// export const useCreateMsg = function () {
//    const { mutate: createNewMsg, isPending } = useMutation({
//       mutationFn: (data) =>
//          fetchData(
//             {
//                url: `/message/create`,
//                method: 'POST',
//                data,
//             },
//             false
//          ),
//    });

//    return { createNewMsg, isPending };
// };
