import { useState } from 'react';
import Image from '../../../ui/Image';
import { imagesIcon } from '../../../utils/icons';

function OfferImages({ images }) {
   const [mainImg, setMainImg] = useState(0);
   const handleImages = (e) => {
      const click = e.target;
      if (!click.dataset.img) return;

      setMainImg(+click.dataset.img);
   };

   return (
      <article className='bg-secondary-white rounded-md lg:w-[44em] overflow-hidden w-full'>
         <div className='lg:w-[38em] h-[25em] mx-auto relative'>
            <Image src={images[mainImg]} alt='main car image' className='object-contain' />
            <p className='absolute right-4 bottom-4 px-2 py-1 flex-center gap-2 bg-primary-black text-primary-white rounded-lg'>
               <span>{imagesIcon}</span>
               {mainImg + 1}/{images.length}
            </p>
         </div>
         <div onClick={handleImages} className='flex gap-4 overflow-auto p-2 bg-white'>
            {images.map((img, i) => (
               <div key={i} className='w-[6em] h-[6em] flex flex-none'>
                  <Image
                     src={img}
                     data-img={i}
                     className={mainImg === i ? 'opacity-20 hover:cursor-not-allowed' : 'hover:cursor-pointer'}
                  />
               </div>
            ))}
         </div>
      </article>
   );
}

export default OfferImages;
