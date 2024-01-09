import { useEffect } from 'react';
import CarsList from './Home/components/CarsList';

function Features() {
   useEffect(() => {
      scrollTo({
         top: 0,
      });
   }, []);

   return (
      <section className='w-[80%] mx-auto py-4'>
         <h2 className='text-2xl font-semibold pb-6' id='cars-section'>
            Promoted offers
         </h2>
         <CarsList />
      </section>
   );
}

export default Features;
