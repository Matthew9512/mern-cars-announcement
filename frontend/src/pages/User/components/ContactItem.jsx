import { useEffect, useState } from 'react';
import Image from '../../../ui/Image';
import { formatTime } from '../../../utils/helpers';

function ContactItem({ chat, handleCurrentChat, reciverId, user, onlineUsers, arrivalMessage, setArrivalMessage }) {
   // const [styleNewMessage, setStyleNewMessage] = useState(() => {
   //    return !chat?.reciverSeen && chat?.reciverId === user?._id ? true : false;
   // });

   const [styleNewMessage, setStyleNewMessage] = useState(false);

   useEffect(() => {
      if (!arrivalMessage) return;
      chat?.members.includes(arrivalMessage?.senderId) &&
         !chat?.members.includes(reciverId) &&
         setStyleNewMessage(true);
      // ???
      return () => {
         setArrivalMessage(null);
      };
   }, [arrivalMessage]);

   useEffect(() => {
      !chat?.reciverSeen && chat?.reciverId === user?._id ? setStyleNewMessage(true) : setStyleNewMessage(false);
   }, [chat]);
   // ===
   const [dimension, setDimension] = useState(false);
   useEffect(() => {
      const debouncedResizeHandler = debounce(() => {
         console.log(`***** ${window.innerWidth} debounced resize`); // See the cool difference in console
         if (window.innerWidth > 660) return setDimension(false);
         if (window.innerWidth <= 640) return setDimension(true);
      }, 100);
      window.addEventListener('resize', debouncedResizeHandler);
      return () => window.removeEventListener('resize', debouncedResizeHandler);
   }, []); // Note this empt

   function debounce(fn, ms) {
      let timer;
      return (_) => {
         clearTimeout(timer);
         timer = setTimeout((_) => {
            timer = null;
            fn.apply(this, arguments);
         }, ms);
      };
   }
   // ===
   return (
      <div
         onClick={() => handleCurrentChat(setStyleNewMessage, chat?.members)}
         className={`${
            chat?.members.includes(reciverId) ? 'border-l-4 border-l-primary-blue' : ''
         } w-full flex items-start gap-2 p-2 hover:bg-primary-white hover:cursor-pointer`}
      >
         <div className='w-12 h-12 relative flex-none'>
            <Image src='/404-robot-com.jpg' className='rounded-full' alt='contact image' />
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
         <div className={`${styleNewMessage ? 'newMessage' : ''} sm:flex hidden w-full justify-between`}>
            <div className=''>
               <p className='first-letter:uppercase text-lg'>
                  {user?.username === chat?.reciverName ? chat?.senderName : chat?.reciverName}
               </p>
               <p className='line-clamp-1'>
                  <span>{chat?.lastSender}: </span>
                  {(arrivalMessage && chat?.members.includes(arrivalMessage?.senderId) && arrivalMessage?.message) ||
                     chat?.lastMessage}
               </p>
            </div>
            <span className='text-sm text-right truncate italic'>
               {(arrivalMessage &&
                  chat?.members.includes(arrivalMessage?.senderId) &&
                  formatTime(arrivalMessage?.created)) ||
                  formatTime(chat?.created)}
            </span>
         </div>
      </div>
   );
}

export default ContactItem;
