import Button from '../../../ui/Button';
import { cityIcon, personIcon, telIcon } from '../../../utils/icons';
import { jwtDecodeToken } from '../../../api/axiosHelper';

function ContactWithSeller({ sellerData, sellerId }) {
   const handleChatBtn = () => {
      if (!sellerId) return;
      const token = jwtDecodeToken();

      if (!token) return (window.location = '/login');
      if (token?.id === sellerId) return;
      window.location = `/user/messages/${sellerId}`;
   };

   return (
      <>
         <h3 className='font-semibold text-lg lg:mt-4 my-0'>Contact with seller:</h3>
         <div className='flex gap-6 flex-col border w-[18em] border-secondary-grey p-4 rounded-md'>
            <p className='flex items-center gap-2'>
               {telIcon}
               +48 {sellerData?.telNumber}
            </p>
            <p className='flex items-center gap-2 capitalize'>
               {personIcon}
               {sellerData?.contactPerson}
            </p>
            <p className='flex items-center gap-2 capitalize'>
               {cityIcon}
               {sellerData?.city}
            </p>
            <Button onClick={handleChatBtn} variant='primary'>
               Chat with seller
            </Button>
         </div>
      </>
   );
}

export default ContactWithSeller;
