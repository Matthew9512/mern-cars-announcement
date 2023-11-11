import CarCard from './CarCard';
import { useSearchOffer } from '../../../api/useOffer';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import Pagination from '../../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { usePagination } from '../../../api/usePagination';

function CarsList() {
   const [searchParams, setSearchParams] = useSearchParams();
   const { page, setPage, handleSetPage } = usePagination(searchParams, setSearchParams);
   const { data, isPending, error } = useSearchOffer(searchParams);

   return (
      <>
         <section className='grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-8 relative min-h-[16em]'>
            {isPending && <LoadingSpinner />}
            {error && <p className='col-span-full'>{error?.message}</p>}
            <p>SEE MORE BTN FOR FEATURES</p>
            {data && data?.offer.map((item) => <CarCard key={item?._id} item={item} />)}
         </section>
         {data?.pagesAmount > 1 && (
            <Pagination page={page} handleSetPage={handleSetPage} pagesAmount={data?.pagesAmount} />
         )}
      </>
   );
}

export default CarsList;
