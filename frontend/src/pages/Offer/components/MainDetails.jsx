import { formatPrice } from '../../../utils/helpers';

function MainDetails({ data }) {
   return (
      <div className='flex flex-col flex-none gap-4 lg:mt-0 mt-6 w-full'>
         <h1 className='font-semibold text-xl first-letter:uppercase'>{data?.title}</h1>
         <div className='flex gap-3'>
            <p>{data?.year}</p>
            <span>•</span>
            <p>{data?.engineCapacity}cm3</p>
            <span>•</span>
            <p className='first-letter:uppercase'>{data?.fuel}</p>
         </div>
         <p className='font-semibold text-lg my-2'>&euro; {formatPrice(data?.price)}</p>
      </div>
   );
}

export default MainDetails;
