import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetOffer } from '../../api/useOffer';
import OfferImages from './components/OfferImages';
import OfferDetils from './components/OfferDetils';
import ContactWithSeller from './components/ContactWithSeller';
import NoOfferFound from '../../ui/NoOfferFound';
import LoadingSpinner from '../../ui/LoadingSpinner';
import MainDetails from './components/MainDetails';

function Offer() {
   const { id } = useParams();
   const { data, isPending } = useGetOffer(id);

   useEffect(() => {
      scrollTo({
         top: 0,
      });
   }, [id]);

   return (
      <section className='px-8 py-16 relative min-h-screen lg:w-4/5 w-full mx-auto flex flex-col'>
         {isPending && <LoadingSpinner />}
         {/* offer if no longer active */}
         {!data?.active ? (
            <NoOfferFound message={'Offer was deleted or is not longer available'} />
         ) : (
            data && (
               <>
                  <div className='flex xl:flex-row flex-col gap-8 relative'>
                     <OfferImages images={data?.images} />
                     <div className='flex flex-col gap-4'>
                        <MainDetails data={data} />
                        <ContactWithSeller sellerData={data?.seller} sellerId={data?.seller?.sellerId} />
                     </div>
                  </div>
                  <OfferDetils data={data} />
               </>
            )
         )}
      </section>
   );
}

export default Offer;
