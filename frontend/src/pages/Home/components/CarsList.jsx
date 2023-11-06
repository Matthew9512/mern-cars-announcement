import CarCard from './CarCard';
import { useGetFeatures } from '../../../api/useOffer';
import LoadingSpinner from '../../../ui/LoadingSpinner';

function CarsList() {
   const { data, isPending, isError } = useGetFeatures();
   console.log(data);
   return (
      <section className='grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-8 relative min-h-[16em]'>
         {isPending && <LoadingSpinner />}
         {isError && <p>Something went wrong please try again later</p>}
         {data ? (
            data.map((item) => <CarCard key={item?._id} item={item} />)
         ) : (
            <p>Theres no offer to show at this moment, please come back later</p>
         )}
      </section>
   );
}

export default CarsList;
