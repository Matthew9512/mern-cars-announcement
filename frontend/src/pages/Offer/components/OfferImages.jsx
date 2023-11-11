import { useEffect, useRef, useState } from 'react';
import Image from '../../../ui/Image';
import { imagesIcon, nextIcon, prevIcon } from '../../../utils/icons';

function OfferImages({ images }) {
   const imgRef = useRef();
   const [mainImg, setMainImg] = useState(0);

   const handleImages = (e) => {
      const click = e.target;
      if (!click.dataset.img) return;

      setMainImg(+click.dataset.img);
   };

   const nextImg = () => {
      setMainImg((prev) => {
         if (prev + 1 === images.length) return 0;

         return prev + 1;
      });
   };
   const prevImg = () => {
      setMainImg((prev) => {
         if (prev === 0) return images.length - 1;

         return prev - 1;
      });
   };

   const scrollToImg = () => {
      const container = imgRef.current.children;
      const curretnImg = [...container].find((value) => +value.dataset.img === mainImg);
      curretnImg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
   };

   // scroll to current image
   useEffect(() => {
      scrollToImg();
   }, [mainImg]);

   return (
      <article className='bg-secondary-white rounded-md lg:w-[44em] w-full'>
         <div className='lg:w-[38em] h-[25em] mx-auto relative'>
            <span onClick={prevImg} className='absolute top-1/2 -left-4 -translate-x-1/2'>
               {prevIcon}
            </span>
            <span onClick={nextImg} className='absolute top-1/2 -right-10 -translate-x-1/2'>
               {nextIcon}
            </span>
            <Image src={images[mainImg]} alt='main car image' className='object-contain' />
            <p className='absolute right-4 bottom-4 px-2 py-1 flex-center gap-2 bg-primary-black text-primary-white rounded-lg'>
               <span>{imagesIcon}</span>
               {mainImg + 1}/{images.length}
            </p>
         </div>
         <div onClick={handleImages} ref={imgRef} className='flex gap-4 overflow-auto p-2 bg-white'>
            {images.map((img, i) => (
               <div key={i} className='w-[6em] h-[6em] flex flex-none' data-img={i}>
                  <Image
                     src={img}
                     data-img={i}
                     alt='cars images'
                     className={`hee ${mainImg === i ? 'opacity-20 hover:cursor-not-allowed' : 'hover:cursor-pointer'}`}
                  />
               </div>
            ))}
         </div>
      </article>
   );
}

export default OfferImages;
