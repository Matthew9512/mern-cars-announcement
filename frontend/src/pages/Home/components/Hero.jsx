import Image from '../../../ui/Image';
import Button from '../../../ui/Button';

function Hero() {
   const handleScroll = () => {
      document.querySelector('#cars-section').scrollIntoView();
   };

   return (
      <header className='flex md:flex-row flex-col'>
         <div className='md:w-2/5 w-full flex flex-col gap-4 py-28 lg:px-8'>
            <h1 className='lg:text-[68px] text-[50px] font-bold text-left'>
               Lorem, ipsum dolor sit amet adipisicing elit
            </h1>
            <span className='text-xl text-primary-grey py-8'>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, modi!
            </span>
            <Button onClick={handleScroll} variant='primary' className='max-w-fit'>
               Find Your Car
            </Button>
         </div>
         <div className='md:w-3/5 w-full md:h-[700px] h-[500px] bg-primary-blue relative shape'>
            <div className='absolute translate-y-[50% 50%] h-full'>
               <Image src='hero.png' alt='hero image' className='object-contain' />
            </div>
         </div>
      </header>
   );
}

export default Hero;
