import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Input from '../../../ui/Input';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import ContactItem from './ContactItem';
import { useGetChatList, useUpdateChat } from '../../../api/useChat';
import { MessagesContext } from '../../../context/messagesContext';

function ContactList({ user, reciverId, resetMessages }) {
   const { arrivalMessage, onlineUsers, setNewMessageNotifyDot } = useContext(MessagesContext);
   const { chatList, isGetChatListPending } = useGetChatList(user?._id);
   const [contactList, setContactList] = useState([]);
   const navigate = useNavigate();
   const { id: paramsId } = useParams();
   const { updateChat } = useUpdateChat(user?._id);
   const queryClient = useQueryClient();

   const handleCurrentChat = (e, setStyleNewMessage, chat) => {
      const id = chat?.members.find((value) => value !== user?._id);
      if (paramsId === id) return;
      const click = e.currentTarget;
      // reset page numb for inf scroll and messages array
      resetMessages();
      // handle notification dot
      if (click.dataset.unread === 'true') {
         setNewMessageNotifyDot((prev) => prev - 1);
         updateChat(chat?._id);
      }
      // remove bold text style from unreaded message
      chatList.find((chatMem) => chatMem?.members.includes(id)) && setStyleNewMessage(false);
      // mark chat as readed
      navigate(generatePath('/user/messages/:id', { id }));
   };

   // search contact by its name based on input value
   const handleSearchContact = (e) => {
      const inpValue = e.target.value.toLowerCase();

      if (!inpValue) return setContactList(chatList);
      if (user?.username.includes(inpValue)) return setContactList([]);
      setContactList(
         chatList.filter((chat) => chat.reciverName.includes(inpValue) || chat.senderName.includes(inpValue))
      );
   };

   // refetch data when new chat is created, users never interact with each other
   useEffect(() => {
      if (!chatList?.length) return;

      setContactList(chatList);
   }, [chatList]);

   useEffect(() => {
      if (!arrivalMessage || !chatList) return;
      if (
         chatList.find(
            (c) => c.members.includes(arrivalMessage.senderId) && c.members.includes(arrivalMessage.reciverId)
         )
      )
         return;
      setTimeout(() => {
         queryClient.invalidateQueries(['chat-list']);
         queryClient.invalidateQueries(['user']);
      }, 2000);
   }, [arrivalMessage]);

   return (
      <aside className='flex flex-col items-start overflow-auto border-r border-r-primary-grey/70 sm:w-96 w-[6.5rem] relative px-2'>
         <Input
            onChange={handleSearchContact}
            className='sm:w-full w-12 mx-auto'
            type='text'
            placeholder='find contact by name'
            disabled={!chatList?.length}
         />
         {isGetChatListPending && <LoadingSpinner />}
         {contactList?.length ? (
            contactList.map((chat) => (
               <ContactItem
                  key={chat?._id}
                  chat={chat}
                  handleCurrentChat={handleCurrentChat}
                  reciverId={reciverId}
                  user={user}
                  onlineUsers={onlineUsers}
                  arrivalMessage={arrivalMessage}
               />
            ))
         ) : (
            <p className='mx-auto text-center py-4'>Your contact list is empty</p>
         )}
      </aside>
   );
}

export default ContactList;
