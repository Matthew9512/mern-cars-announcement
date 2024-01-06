import { useSearchParams } from 'react-router-dom';
import CarCard from './CarCard';
import { useSearchOffer } from '../../../api/useOffer';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import Pagination from '../../../ui/Pagination';
import { usePagination } from '../../../api/usePagination';
import NoOfferFound from '../../../ui/NoOfferFound';
import LinkButton from '../../../ui/LinkButton';

function CarsList() {
   const [searchParams, setSearchParams] = useSearchParams();
   const { page, handleSetPage } = usePagination(searchParams, setSearchParams);
   const { data, isPending, error } = useSearchOffer(searchParams);

   return (
      <>
         <section className='grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-8 relative min-h-[16em]'>
            {isPending && <LoadingSpinner />}
            {error && (
               <div className='col-span-full'>
                  <NoOfferFound message={error?.message} />
               </div>
            )}
            {data && data?.offer.map((item) => <CarCard key={item?._id} item={item} />)}
         </section>
         {!location.pathname.startsWith('/features') && (
            <LinkButton
               to='/features?page=1'
               variant='primary'
               className='absolute left-1/2 -translate-x-1/2 bottom-16'
            >
               See all promoted cars
            </LinkButton>
         )}
         {data?.pagesAmount > 1 && location.search && (
            <Pagination page={page} handleSetPage={handleSetPage} pagesAmount={data?.pagesAmount} />
         )}
      </>
   );
}

export default CarsList;
