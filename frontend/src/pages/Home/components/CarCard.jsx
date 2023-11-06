import Image from '../../../ui/Image';
import LinkButton from '../../../ui/LinkButton';
import { engineIcon, fuelIcon, transmissionIcon } from '../../../utils/icons';
import { formatPrice } from '../../../utils/helpers';

function CarCard({ item }) {
   return (
      <div className='bg-secondary-white p-4 rounded-md w-[16em]'>
         <p className='font-semibold mb-3 truncate'>{item?.title}</p>
         <p className='text-2xl'>&euro; {formatPrice(item?.price)}</p>
         <div className='w-56 h-56 my-4 flex-center rounded-md overflow-hidden'>
            <Image src={item?.images?.at(0)} alt={item?.title} />
         </div>
         <div className='flex-center gap-6'>
            <span className='flex flex-col items-center gap-2'>
               {fuelIcon} {item?.fuel}
            </span>
            <span className='flex flex-col items-center gap-2'>
               {transmissionIcon} {item?.transmitionType}
            </span>
            <span className='flex flex-col items-center gap-2'>
               {engineIcon} {item?.engineCapacity}
            </span>
         </div>
         <LinkButton to={`offer/${item?._id}`} variant='primary' className='ml-12 mt-4'>
            See more
         </LinkButton>
      </div>
   );
}

export default CarCard;
// function CarCard({item}) {
//    return (
//       <div className='bg-secondary-white p-4 rounded-md'>
//          <p className='font-semibold mb-3'>kia pro ceed</p>
//          <p>
//             <span className='text-2xl'>$100</span>/day
//          </p>
//          <div className='w-56 h-56 flex-center'>
//             <Image src='hero.png' />
//          </div>
//          <div className='flex-center gap-6'>
//             <span className='flex flex-col items-center gap-2'>{fuelIcon} diesel</span>
//             <span className='flex flex-col items-center gap-2'>{transmissionIcon} manual</span>
//             <span className='flex flex-col items-center gap-2'>{engineIcon} 3.2</span>
//          </div>
//          <Button variant='primary' className='ml-12 mt-4'>
//             See more
//          </Button>
//       </div>
//    );
// }
