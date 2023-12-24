import Image from '../../../ui/Image';
import { formatTime } from '../../../utils/helpers';

function Message({ msg, senderId }) {
   return (
      <div className={`flex my-2 ${msg?.senderId === senderId ? 'justify-end' : 'justify-start'} `}>
         <div className={`grid grid-cols-[2rem,80%] gap-2 place-items-start`}>
            <div className='h-8 border border-primary-grey rounded-full'>
               <Image src='/404-robot-com2.png' className='rounded-full' alt='contact image' />
            </div>
            <p
               className={`${
                  msg?.senderId === senderId ? 'bg-primary-white' : 'bg-primary-blue text-primary-white'
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
