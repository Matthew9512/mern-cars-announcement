import Image from '../../../ui/Image';
import { closeIcon } from '../../../utils/icons';

function UploadedImgs({ uploadedImgArr, setUploadedImgArr, filePerc }) {
   const removeImg = (img) => {
      setUploadedImgArr((prev) => {
         return prev.filter((link) => link !== img);
      });
   };
   return (
      <>
         {uploadedImgArr.map((img, i) => (
            <div key={img} className='flex items-center gap-2 h-24 relative bg-secondary-white'>
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
