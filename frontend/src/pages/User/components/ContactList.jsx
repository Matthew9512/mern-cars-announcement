import { generatePath, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../../ui/Input';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import ContactItem from './ContactItem';
import { useGetChatList } from '../../../api/useChat';

function ContactList({ senderId, reciverId, onlineUsers }) {
   const { chatList, isGetChatListPending } = useGetChatList(senderId);
   const [contactList, setContactList] = useState([]);
   const navigate = useNavigate();

   const handleCurrentChat = (arr) => {
      const id = arr?.find((value) => value !== senderId);

      navigate(generatePath('/user/messages/:id', { id }));
   };

   // search contact by its name based on input value
   const handleSearchContact = (e) => {
      const inpValue = e.target.value;

      if (!inpValue) return setContactList(chatList);

      setContactList(contactList.filter((chat) => chat.reciverName.includes(inpValue.toLowerCase())));
   };

   useEffect(() => {
      if (!chatList?.length) return;

      setContactList(chatList);
   }, [chatList]);

   return (
      <aside className='flex flex-col items-start overflow-auto border-r border-r-primary-grey/70 sm:w-96 w-26 relative px-2'>
         <Input
            onChange={handleSearchContact}
            className='sm:w-full w-12 mx-auto'
            type='text'
            placeholder='search for someone xd'
         />
         {isGetChatListPending && <LoadingSpinner />}
         {contactList?.length ? (
            contactList.map((chat) => (
               <ContactItem
                  key={chat?._id}
                  chat={chat}
                  handleCurrentChat={handleCurrentChat}
                  reciverId={reciverId}
                  onlineUsers={onlineUsers}
               />
            ))
         ) : (
            <p className='text-center'>Your contact list is empty</p>
         )}
      </aside>
   );
}

export default ContactList;
