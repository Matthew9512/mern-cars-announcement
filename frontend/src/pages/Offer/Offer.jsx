import { useParams } from 'react-router-dom';
import { useGetOffer } from '../../api/useOffer';
import OfferImages from './components/OfferImages';
import OfferDetils from './components/OfferDesc';
import ContactWithSeller from './components/ContactWithSeller';
import LoadingSpinner from '../../ui/LoadingSpinner';
import MainDetails from './components/MainDetails';
import { useEffect } from 'react';

/**
 * @todo follow
 */

function Offer() {
   const { id } = useParams();
   const { data, isPending, error } = useGetOffer(id);

   useEffect(() => {
      scrollTo({
         top: 0,
      });
   }, [id]);

   return (
      <section className='px-8 py-16 relative min-h-screen lg:w-4/5 w-full mx-auto flex flex-col'>
         {isPending && <LoadingSpinner />}
         {error && <p className='mx-auto'>{error?.message}</p>}
         {data && (
            <>
               <div className='flex xl:flex-row flex-col gap-8 relative'>
                  <OfferImages images={data?.images} />
                  <div className='flex flex-col gap-4'>
                     <MainDetails data={data} />
                     <ContactWithSeller sellerData={data?.seller} />
                  </div>
               </div>
               <OfferDetils data={data} />
            </>
         )}
      </section>
   );
}

export default Offer;
