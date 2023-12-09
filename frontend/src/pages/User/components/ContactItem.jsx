import Image from '../../../ui/Image';
import { formatTime } from '../../../utils/helpers';

/**
 * @todo if sender was last sender then display 'You' else name?
 */

function ContactItem({ chat, handleCurrentChat, reciverId, onlineUsers }) {
   return (
      <div
         onClick={() => handleCurrentChat(chat?.members)}
         className={`${
            chat?.reciverId === reciverId ? 'border-l-4 border-l-primary-blue' : ''
            // chat?.members.includes(reciverId) ? 'bg-primary-white' : ''
         } w-full flex items-start gap-2 p-2 hover:bg-primary-white hover:cursor-pointer`}
      >
         <div className='w-12 h-12 relative flex-none'>
            <Image src='/404-robot-com.jpg' className='rounded-full' alt='contact image' />
            <span
               className={`${
                  onlineUsers && onlineUsers.find((user) => user?.userId === chat?.reciverId)
                     ? 'bg-primary-green'
                     : 'bg-primary-grey'
               }
                absolute bottom-0 right-0 rounded-full w-4 h-4`}
            ></span>
         </div>
         <div className='sm:flex hidden w-full justify-between'>
            <div className=''>
               <p className='first-letter:uppercase text-lg'>{chat?.reciverName}</p>
               <p className='line-clamp-1'>
                  <span>{chat?.lastSender}: </span>
                  {chat?.lastMessage}
               </p>
            </div>
            <span className='text-sm text-right truncate italic'>{formatTime(chat?.created)}</span>
         </div>
      </div>
   );
}

export default ContactItem;
