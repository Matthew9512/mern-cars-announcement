import LinkButton from '../../../ui/LinkButton';
import { cityIcon, personIcon, telIcon } from '../../../utils/icons';

function ContactWithSeller({ sellerData }) {
   return (
      <>
         <h3 className='font-semibold text-lg lg:mt-4 my-0'>Contact with seller:</h3>
         <div className='flex gap-6 flex-col border w-[20em] border-secondary-grey p-4 rounded-md'>
            <p className='flex items-center gap-2'>
               {telIcon}
               +48 {sellerData?.telNumber}
            </p>
            <p className='flex items-center gap-2'>
               {personIcon}
               {sellerData?.contactPerson}
            </p>
            <p className='flex items-center gap-2'>
               {cityIcon}
               {sellerData?.city}
            </p>
            <LinkButton variant='primary'>Chat with seller</LinkButton>
         </div>
      </>
   );
}

export default ContactWithSeller;
