import Image from '../../../ui/Image';
import LinkButton from '../../../ui/LinkButton';
import { engineIcon, fuelIcon, transmissionIcon } from '../../../utils/icons';
import { formatPrice } from '../../../utils/helpers';

function CarCard({ item, disabled = false }) {
   return (
      <div className='bg-secondary-white p-4 rounded-md w-[16em] group'>
         <p className='font-semibold mb-3 truncate'>{item?.title}</p>
         <p className='text-2xl'>&euro; {formatPrice(item?.price)}</p>
         <div className='w-56 h-56 my-4 flex-center rounded-md overflow-hidden relative'>
            <Image src={item?.images?.at(0)} alt={`${item?.brand} image`} />
            <Image
               src={item?.images?.at(1)}
               alt={`${item?.brand} image`}
               className='absolute inset-0 opacity-0 duration-300 group-hover:opacity-100'
            />
         </div>
         <div className='flex-center gap-6'>
            <span className='flex flex-col items-center gap-2'>
               {fuelIcon} {item?.fuel}
            </span>
            <span className='flex flex-col items-center gap-2'>
               {transmissionIcon} {item?.transmitionType}
            </span>
            <span className='flex flex-col items-center gap-2'>
               {engineIcon} {(+item?.engineCapacity / 1000).toFixed(1)}
            </span>
         </div>
         <LinkButton to={`/offer/${item?._id}`} disabled={disabled} variant='primary' className='ml-[3.7rem] mt-4'>
            See more
         </LinkButton>
      </div>
   );
}

export default CarCard;
