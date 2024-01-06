import { useMemo } from 'react';
import { formatTime } from '../../../utils/helpers';

function Message({ msg, user, chatInfo }) {
   const username = useMemo(() => {
      return msg?.senderId === user?._id ? user?.username : chatInfo?.reciverName;
   }, [msg, chatInfo]);

   return (
      <div className={`flex my-2 ${msg?.senderId === user?._id ? 'justify-end' : 'justify-start'} `}>
         <div className={`grid grid-cols-[2rem,1fr] max-w-[80%] gap-2 place-items-start`}>
            <div
               className='h-8 w-8 rounded-full flex-center uppercase'
               style={{ backgroundColor: msg?.senderId === user?._id ? user.usersAvatar : chatInfo?.reciverAvatar }}
            >
               <span>{username?.at(0)}</span>
            </div>
            <p
               className={`${
                  msg?.senderId === user?._id ? 'bg-primary-white' : 'bg-primary-blue text-primary-white'
               } p-1 rounded-md`}
            >
               {msg?.message}
            </p>
            <span className='text-xs italic text-primary-grey col-span-2'>{formatTime(msg?.created)}</span>
         </div>
      </div>
   );
}

export default Message;
