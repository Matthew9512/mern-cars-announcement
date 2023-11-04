import CarCard from './CarCard';

function CarsList() {
   return (
      <section className='grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-8'>
         <CarCard />
         <CarCard />
         <CarCard />
         <CarCard />
         <CarCard />
      </section>
   );
}

export default CarsList;
