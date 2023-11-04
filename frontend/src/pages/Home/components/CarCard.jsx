import Image from '../../../ui/Image';
import Button from '../../../ui/Button';
import { engineIcon, fuelIcon, transmissionIcon } from '../../../utils/icons';

function CarCard() {
   return (
      <div className='bg-secondary-white p-4 rounded-md'>
         <p className='font-semibold mb-3'>kia pro ceed</p>
         <p>
            <span className='text-2xl'>$100</span>/day
         </p>
         <div className='w-56 h-56 flex-center'>
            <Image src='hero.png' />
         </div>
         <div className='flex-center gap-6'>
            <span className='flex flex-col items-center gap-2'>{fuelIcon} diesel</span>
            <span className='flex flex-col items-center gap-2'>{transmissionIcon} manual</span>
            <span className='flex flex-col items-center gap-2'>{engineIcon} 3.2</span>
         </div>
         <Button variant='primary' className='ml-12 mt-4'>
            See more
         </Button>
      </div>
   );
}

export default CarCard;
