import Empty from './Empty';
import Image from './Image';

function NoOfferFound({ message }) {
   return (
      <div className='mx-auto'>
         <Empty resourceName='offer'>
            <span>{message}</span>
         </Empty>
         <div className='lg:w-[38em] h-[38em]'>
            <Image src='/no-offer.png' />
         </div>
         <p className='absolute bottom-10 left-1/2 -translate-x-1/2 w-max font-bold'>
            <a href='https://storyset.com/data'>
               Data illustrations by <span className='underline'>Storyset</span>
            </a>
         </p>
      </div>
   );
}

export default NoOfferFound;
