import { useEffect, useState } from 'react';
import { formatTime } from '../../../utils/helpers';
import { useScreen } from '../../../api/useScreen';
import Avatar from './Avatar';

function ContactItem({ chat, handleCurrentChat, reciverId, user, onlineUsers, arrivalMessage }) {
   const [styleNewMessage, setStyleNewMessage] = useState(false);
   const dimension = useScreen(arrivalMessage);

   // helpers
   const username = user?.username === chat?.reciverName ? chat?.senderName : chat?.reciverName;
   const checkArrMsg = arrivalMessage && chat?.members.includes(arrivalMessage?.senderId);

   useEffect(() => {
      if (!arrivalMessage) return;
      chat?.members.includes(arrivalMessage?.senderId) &&
         !chat?.members.includes(reciverId) &&
         setStyleNewMessage(true);
   }, [arrivalMessage]);

   useEffect(() => {
      !chat?.reciverSeen && chat?.reciverId === user?._id ? setStyleNewMessage(true) : setStyleNewMessage(false);
   }, [chat, user?._id]);

   return (
      <div
         onClick={() => handleCurrentChat(setStyleNewMessage, chat?.members)}
         className={`${
            chat?.members.includes(reciverId) ? 'border-l-4 border-l-primary-blue' : ''
         } w-full flex items-start gap-2 p-2 hover:bg-primary-white hover:cursor-pointer`}
      >
         <Avatar
            user={user}
            onlineUsers={onlineUsers}
            chat={chat}
            username={username}
            styleNewMessage={styleNewMessage}
            dimension={dimension}
         />
         <div className={`${styleNewMessage && 'font-bold'} sm:flex flex-col w-full hidden justify-between`}>
            <div className='flex justify-between'>
               <p className='first-letter:uppercase text-lg'>{username}</p>
               <span className='text-xs text-right truncate italic pr-1'>
                  {(checkArrMsg && formatTime(arrivalMessage?.created)) || formatTime(chat?.created)}
               </span>
            </div>
            <p className='line-clamp-1'>
               <span>{chat?.lastSender}: </span>
               {(checkArrMsg && arrivalMessage?.message) || chat?.lastMessage}
            </p>
         </div>
      </div>
   );
}

export default ContactItem;
