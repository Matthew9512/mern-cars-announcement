import Empty from '../../../ui/Empty';
import Image from '../../../ui/Image';

function NoOfferFound({ message }) {
   return (
      <div className='mx-auto'>
         <Empty resourceName='ad'>
            <span>{message}</span>
         </Empty>
         <div className='lg:w-[38em] h-[38em]'>
            <Image src='/no-offer.png' />
         </div>
         <p className='absolute bottom-20 left-1/2 -translate-x-1/2 font-bold'>
            <a href='https://storyset.com/data'>
               Data illustrations by <span className='underline'>Storyset</span>
            </a>
         </p>
      </div>
   );
}

export default NoOfferFound;
