import { useGetUser } from '../../../api/useAuth';
import Button from '../../../ui/Button';
import { cityIcon, personIcon, telIcon } from '../../../utils/icons';

function ContactWithSeller({ sellerData, sellerId }) {
   const { data } = useGetUser();

   const handleChatBtn = () => {
      if (!sellerId) return;
      if (!data?.user?._id) return (window.location = '/login');
      window.location = `/user/messages/${sellerId}`;
   };

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
            <Button onClick={handleChatBtn} variant='primary'>
               Chat with seller
            </Button>
         </div>
      </>
   );
}

export default ContactWithSeller;

// <LinkButton to={`/user/messages/${sellerId}`} disabled={!data?.user?._id} variant='primary'>
//    Chat with seller
// </LinkButton>
