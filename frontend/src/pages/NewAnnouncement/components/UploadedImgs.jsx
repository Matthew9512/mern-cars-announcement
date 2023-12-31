import { useEffect } from 'react';
import Image from '../../../ui/Image';
import { closeIcon } from '../../../utils/icons';

function UploadedImgs({ uploadedImgArr, setUploadedImgArr, setError }) {
   const removeImg = (img) => {
      setUploadedImgArr((prev) => {
         return prev.filter((link) => link !== img);
      });
   };

   // add error if user removed all images
   useEffect(() => {
      if (uploadedImgArr.length === 0)
         setError('images', { type: 'custom', message: 'At least on image of your car is required' });
   }, [uploadedImgArr]);

   return (
      <>
         {uploadedImgArr.map((img) => (
            <div key={img} className='flex items-center gap-2 h-24 relative bg-secondary-white overflow-hidden'>
               <div className='w-24'>
                  <Image src={img} alt='uploaded car image' />
               </div>
               <p className='opacity-70'>Picked image</p>
               <span
                  onClick={() => removeImg(img)}
                  className='absolute top-2 right-2 hover:cursor-pointer hover:opacity-50'
               >
                  {closeIcon}
               </span>
            </div>
         ))}
      </>
   );
}

export default UploadedImgs;
