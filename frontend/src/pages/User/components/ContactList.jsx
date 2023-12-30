import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { memo, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Input from '../../../ui/Input';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import ContactItem from './ContactItem';
import { useGetChatList } from '../../../api/useChat';
import { MessagesContext } from '../../../context/messagesContext';

function ContactList({ user, reciverId, resetMessages }) {
   const { arrivalMessage, onlineUsers, setNewMessageNotifyDot } = useContext(MessagesContext);
   const { chatList, isGetChatListPending } = useGetChatList(user?._id);
   const [contactList, setContactList] = useState([]);
   const navigate = useNavigate();
   const { id: paramsId } = useParams();
   const queryClient = useQueryClient();

   const handleCurrentChat = (setStyleNewMessage, arr) => {
      const id = arr?.find((value) => value !== user?._id);
      if (paramsId === id) return;
      // reset page numb for inf scroll and messages array
      resetMessages();
      // handle notification dot
      setNewMessageNotifyDot((prev) => prev - 1);
      // remove bold text style from unreaded message
      chatList.find((user) => user?.members.includes(id)) && setStyleNewMessage(false);
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

   useEffect(() => {
      if (!arrivalMessage) return;

      if (contactList.find((c) => c.members.includes(arrivalMessage.reciverId))) return;
      setTimeout(() => {
         queryClient.invalidateQueries(['chat-list']);
      }, 1000);
   }, [arrivalMessage, contactList]);

   return (
      <aside className='flex flex-col items-start overflow-auto border-r border-r-primary-grey/70 sm:w-96 w-[6.5rem] relative px-2'>
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
                  user={user}
                  onlineUsers={onlineUsers}
                  arrivalMessage={arrivalMessage}
               />
            ))
         ) : (
            <p className='text-center'>Your contact list is empty</p>
         )}
      </aside>
   );
}

export default ContactList;
// import { generatePath, useNavigate, useParams } from 'react-router-dom';
// import { memo, useContext, useEffect, useState } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import Input from '../../../ui/Input';
// import LoadingSpinner from '../../../ui/LoadingSpinner';
// import ContactItem from './ContactItem';
// import { useGetChatList } from '../../../api/useChat';
// import { MessagesContext } from '../../../context/messagesContext';

// const ContactList = memo(function ContactList({ user, reciverId, resetMessages }) {
//    const { arrivalMessage, onlineUsers, setNewMessageNotifyDot } = useContext(MessagesContext);
//    const { chatList, isGetChatListPending } = useGetChatList(user?._id);
//    const [contactList, setContactList] = useState([]);
//    const navigate = useNavigate();
//    const { id: paramsId } = useParams();
//    const queryClient = useQueryClient();

//    const handleCurrentChat = (setStyleNewMessage, arr) => {
//       const id = arr?.find((value) => value !== user?._id);
//       if (paramsId === id) return;
//       // reset page numb for inf scroll and messages array
//       resetMessages();
//       // handle notification dot
//       setNewMessageNotifyDot((prev) => prev - 1);
//       // remove bold text style from unreaded message
//       chatList.find((user) => user?.members.includes(id)) && setStyleNewMessage(false);
//       navigate(generatePath('/user/messages/:id', { id }));
//    };

//    // search contact by its name based on input value
//    const handleSearchContact = (e) => {
//       const inpValue = e.target.value;

//       if (!inpValue) return setContactList(chatList);

//       setContactList(contactList.filter((chat) => chat.reciverName.includes(inpValue.toLowerCase())));
//    };

//    useEffect(() => {
//       if (!chatList?.length) return;

//       setContactList(chatList);
//    }, [chatList]);

//    useEffect(() => {
//       if (!arrivalMessage) return;

//       if (contactList.find((c) => c.members.includes(arrivalMessage.reciverId))) return;
//       console.log('invalidate');
//       queryClient.invalidateQueries(['chat-list']);
//    }, [arrivalMessage]);
//    // md:w-1/5
//    return (
//       <aside className='flex flex-col items-start overflow-auto border-r border-r-primary-grey/70 sm:w-96 w-[6,5rem] relative px-2'>
//          <Input
//             onChange={handleSearchContact}
//             className='sm:w-full w-12 mx-auto'
//             type='text'
//             placeholder='search for someone xd'
//          />
//          {isGetChatListPending && <LoadingSpinner />}
//          {contactList?.length ? (
//             contactList.map((chat) => (
//                <ContactItem
//                   key={chat?._id}
//                   chat={chat}
//                   handleCurrentChat={handleCurrentChat}
//                   reciverId={reciverId}
//                   user={user}
//                   onlineUsers={onlineUsers}
//                   arrivalMessage={arrivalMessage}
//                />
//             ))
//          ) : (
//             <p className='text-center'>Your contact list is empty</p>
//          )}
//       </aside>
//    );
// });

// export default ContactList;
