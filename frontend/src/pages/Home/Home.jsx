import CarsList from './components/CarsList';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';

function Home() {
   return (
      <>
         <Hero />
         <section className='w-[80%] mx-auto'>
            <h2 className='text-2xl font-semibold'>Cars catalogue</h2>
            <p>Search for your dream car:</p>
            <SearchBar />
            <CarsList />
         </section>
      </>
   );
}

export default Home;
