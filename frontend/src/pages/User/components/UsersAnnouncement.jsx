import { useRef, useState } from 'react';
import UsersNavbar from './UsersNavbar';
import { useGetUser, useGetUserAds, useOfferStatus } from '../../../api/useAuth';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import Empty from '../../../ui/Empty';
import CarCard from '../../Home/components/CarCard';
import LoadingButton from '../../../ui/LoadingButton';
import Modal from '../../../ui/Modal';

function UsersAnnouncement() {
   const [display, setDisplay] = useState(false);
   const { data: user, isPending, error } = useGetUser();
   const queries = useGetUserAds(user?.announcements);
   const mutateOfferStatus = useOfferStatus();
   let reqBody = useRef();

   const handleOfferState = (e, offerID) => {
      const click = e.target.textContent;
      if (click === 'Deactivate') {
         reqBody.current = {
            endpoint: `/user/deactivate-offer`,
            body: { offerID },
         };
      }
      if (click === 'Activate') {
         reqBody.current = {
            endpoint: `/user/activate-offer`,
            body: { offerID },
         };
      }
      if (click === 'Cancel') {
         reqBody.current = {
            endpoint: `/user/remove-offer`,
            body: { offerID, userID: user?._id },
         };
      }
      setDisplay(true);
   };

   return (
      <section className='bg-secondary-white p-8 relative min-h-[85vh]  flex flex-col'>
         <Modal
            display={display}
            setDisplay={setDisplay}
            item='offer'
            fetchQuery={mutateOfferStatus}
            params={reqBody.current}
         />
         <UsersNavbar />
         {isPending && <LoadingSpinner />}
         {queries.length > 0 ? (
            <article className='lg:w-4/5 w-full pt-8 mx-auto grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-16 relative min-h-[16em]'>
               {queries.map((car) => (
                  <div key={car?.data?._id} className='relative'>
                     <div className={` ${car?.data?.active ? 'opacity-100' : 'opacity-30'}`}>
                        <CarCard item={car?.data} disabled={!car?.data?.active} className='bg-primary-black' />
                     </div>
                     <div className='absolute -top-10 right-0 space-x-4'>
                        <LoadingButton onClick={(e) => handleOfferState(e, car?.data?._id)}>
                           {car?.data?.active ? 'Deactivate' : 'Activate'}
                        </LoadingButton>
                        <LoadingButton onClick={(e) => handleOfferState(e, car?.data?._id)}>Remove</LoadingButton>
                     </div>
                  </div>
               ))}
            </article>
         ) : (
            <div className='text-center mt-8 space-y-4'>
               <Empty resourceName='user'>
                  <p>No users data available</p>
               </Empty>
            </div>
         )}
      </section>
   );
}

export default UsersAnnouncement;

// if (click === 'Deactivate') {
//    mutateOfferStatus({
//       endpoint: `/user/deactivate-offer`,
//       body: { offerID },
//    });
// }
// if (click === 'Activate') {
//    mutateOfferStatus({
//       endpoint: `/user/activate-offer`,
//       body: { offerID },
//    });
// }
// if (click === 'Cancle') {
//    mutateOfferStatus({
//       endpoint: `/user/remove-offer`,
//       body: { offerID, userID: user?._id },
//    });
// }
