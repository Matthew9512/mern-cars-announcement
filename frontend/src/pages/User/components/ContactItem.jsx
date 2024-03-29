import { useEffect, useMemo, useState } from 'react';
import { contactItemData, formatTime } from '../../../utils/helpers';
import { useScreen } from '../../../api/useScreen';
import Avatar from './Avatar';

function ContactItem({ chat, handleCurrentChat, reciverId, user, onlineUsers, arrivalMessage }) {
   const [styleNewMessage, setStyleNewMessage] = useState(() => {
      return user?.unseenChats.includes(chat?._id) ? true : false;
   });
   const dimension = useScreen(arrivalMessage);
   const contactData = useMemo(() => contactItemData(user, chat, arrivalMessage), [user, chat, arrivalMessage]);

   useEffect(() => {
      if (!arrivalMessage) return;
      chat?.members.includes(arrivalMessage?.senderId) &&
         !chat?.members.includes(reciverId) &&
         setStyleNewMessage(true);
   }, [arrivalMessage]);

   useEffect(() => {
      if (!user) return;
      user?.unseenChats.includes(chat?._id) ? setStyleNewMessage(true) : setStyleNewMessage(false);
   }, [user]);

   return (
      <div
         onClick={(e) => handleCurrentChat(e, setStyleNewMessage, chat)}
         className={`${
            chat?.members.includes(reciverId) ? 'border-l-4 border-l-primary-blue' : ''
         } w-full flex items-start gap-2 p-2 hover:bg-primary-white hover:cursor-pointer`}
         data-unread={styleNewMessage}
      >
         <Avatar
            user={user}
            onlineUsers={onlineUsers}
            chat={chat}
            username={contactData?.username}
            styleNewMessage={styleNewMessage}
            dimension={dimension}
         />
         <div className={`${styleNewMessage ? 'font-bold' : ''} sm:flex flex-col w-full hidden justify-between`}>
            <div className='flex justify-between'>
               <p className='first-letter:uppercase text-lg'>{contactData?.username}</p>
               <span className='text-xs text-right truncate italic pr-1'>
                  {(contactData?.checkArrMsg && formatTime(arrivalMessage?.created)) || formatTime(chat?.created)}
               </span>
            </div>
            <p className='line-clamp-1'>
               <span>{chat?.lastSender}: </span>
               {(contactData?.checkArrMsg && arrivalMessage?.message) || chat?.lastMessage}
            </p>
         </div>
      </div>
   );
}

export default ContactItem;
