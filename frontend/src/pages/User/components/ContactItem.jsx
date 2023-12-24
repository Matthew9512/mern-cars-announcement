import { useEffect, useState } from 'react';
import Image from '../../../ui/Image';
import { formatTime } from '../../../utils/helpers';
import { useScreen } from '../../../api/useScreen';

function ContactItem({ chat, handleCurrentChat, reciverId, user, onlineUsers, arrivalMessage }) {
   const [styleNewMessage, setStyleNewMessage] = useState(false);
   const dimension = useScreen(arrivalMessage);

   useEffect(() => {
      if (!arrivalMessage) return;
      chat?.members.includes(arrivalMessage?.senderId) &&
         !chat?.members.includes(reciverId) &&
         setStyleNewMessage(true);
   }, [arrivalMessage]);

   useEffect(() => {
      !chat?.reciverSeen && chat?.reciverId === user?._id ? setStyleNewMessage(true) : setStyleNewMessage(false);
   }, [chat]);

   return (
      <div
         onClick={() => handleCurrentChat(setStyleNewMessage, chat?.members)}
         className={`${
            chat?.members.includes(reciverId) ? 'border-l-4 border-l-primary-blue' : ''
         } w-full flex items-start gap-2 p-2 hover:bg-primary-white hover:cursor-pointer`}
      >
         <div className='w-12 h-12 relative flex-none'>
            <Image src='/404-robot-com2.png' className='rounded-full' alt='contact image' />
            <span
               className={`${
                  onlineUsers && onlineUsers.find((u) => chat.members.includes(u.userId))
                     ? 'bg-primary-green'
                     : 'bg-primary-grey'
               }  absolute bottom-0 right-0 rounded-full w-4 h-4`}
            ></span>
            <span
               className={`${
                  styleNewMessage && dimension && 'bg-primary-red'
               } absolute bottom-0 right-0 rounded-full w-4 h-4 z-30`}
            ></span>
         </div>
         <div className={`${styleNewMessage ? 'newMessage' : ''} sm:flex flex-col w-full hidden justify-between`}>
            <div className='flex justify-between'>
               <p className='first-letter:uppercase text-lg'>
                  {user?.username === chat?.reciverName ? chat?.senderName : chat?.reciverName}
               </p>
               <span className='text-sm text-right truncate italic pr-1'>
                  {(arrivalMessage &&
                     chat?.members.includes(arrivalMessage?.senderId) &&
                     formatTime(arrivalMessage?.created)) ||
                     formatTime(chat?.created)}
               </span>
            </div>
            <p className='line-clamp-1'>
               <span>{chat?.lastSender}: </span>
               {(arrivalMessage && chat?.members.includes(arrivalMessage?.senderId) && arrivalMessage?.message) ||
                  chat?.lastMessage}
            </p>
         </div>
      </div>
   );
}

export default ContactItem;
