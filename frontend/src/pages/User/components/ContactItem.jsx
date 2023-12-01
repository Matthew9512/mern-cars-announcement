import Image from '../../../ui/Image';
import { formatTime } from '../../../utils/helpers';

function ContactItem() {
   return (
      <div className='w-full flex items-start gap-2 rounded-md p-2 hover:bg-primary-white/60 hover:cursor-pointer'>
         <div className='w-12 h-12 relative flex-none'>
            <Image src='/404-robot-com.jpg' className='rounded-full' alt='contact image' />
            <span className='absolute bottom-0 right-0 rounded-full w-4 h-4 bg-primary-black'></span>
         </div>
         <div className='sm:flex hidden w-full justify-between'>
            <div className=''>
               <p>last sender</p>
               <p>last message</p>
            </div>
            <span>creatde</span>
         </div>
      </div>
   );
}

export default ContactItem;
