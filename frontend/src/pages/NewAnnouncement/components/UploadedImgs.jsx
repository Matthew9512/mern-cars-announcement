import Image from '../../../ui/Image';
import { closeIcon } from '../../../utils/icons';

function UploadedImgs({ uploadedImgArr, filePerc }) {
   const removeImg = () => {};
   return (
      <>
         {uploadedImgArr.map((img, i) => (
            <div key={i} className='flex items-center h-24 relative bg-secondary-white'>
               <div className='w-24'>
                  <Image src={img} alt='uploaded car image' />
               </div>
               <p className='opacity-70'>Picked image</p>
               <span onClick={removeImg} className='absolute top-2 right-2'>
                  {closeIcon}
               </span>
            </div>
         ))}
      </>
   );
}

export default UploadedImgs;
