import { useRef, useState } from 'react';
import Input from '../../../ui/Input';
import LoadingButton from '../../../ui/LoadingButton';
import { useFileUpload } from '../../../utils/firebase';
import Button from '../../../ui/Button';
import Select from '../../../ui/Select';
import UploadedImgs from './UploadedImgs';
import { brandsArr, carBodyTypesArr, fuelsArr } from '../../../utils/constants';

function UploadFile() {
   const [uploadedImgArr, setUploadedImgArr] = useState([]);
   const { handleFileUpload, filePerc, err, loading } = useFileUpload(setUploadedImgArr);
   const uploadRef = useRef();

   const handleUploads = (e) => {
      e.preventDefault();
      const imgs = uploadRef.current.files;
      // invoke uploading fn for every image
      [...imgs].forEach((img) => {
         handleFileUpload(img);
      });
   };
   // flex-center gap-4
   return (
      <form className='py-16'>
         <h1 className='font-semibold text-2xl mx-auto pb-8'>Add New Announcement</h1>
         <div className='flex lg:flex-row flex-col lg:gap-16 gap-8 '>
            <div className='flex flex-col gap-2 w-72'>
               <label htmlFor='title'>Announcement title:</label>
               <Input type='text' placeholder='title' name='title' id='title' />
               <label htmlFor='brand-list-add'>Brand of your car:</label>
               <Input placeholder='brand' type='text' name='brand' list='brand-list-add' />
               <datalist id='brand-list-add'>
                  {brandsArr.map((option) => (
                     <option value={option} key={option}>
                        {option}
                     </option>
                  ))}
               </datalist>
               <label htmlFor='model'>Model of your car:</label>
               <Input type='text' placeholder='model' name='model' id='model' />
               <Input
                  inpRef={uploadRef}
                  variant='upload'
                  type='file'
                  hidden
                  multiple
                  accept='image/*'
                  placeholder='name'
               />
               <div className='flex-center gap-4 my-4'>
                  <p
                     onClick={() => uploadRef.current.click()}
                     className='underline hover:cursor-pointer hover:opacity-70'
                  >
                     Pick photos (max 6)
                  </p>
                  <LoadingButton className='mx-auto' onClick={handleUploads} isLoading={loading}>
                     Add photos
                  </LoadingButton>
               </div>
               <UploadedImgs uploadedImgArr={uploadedImgArr} filePerc={filePerc} />
               <label htmlFor='price'>Price:</label>
               <Input type='number' placeholder='$' name='price' id='price' />
            </div>
            <div className='flex flex-col gap-2 w-72'>
               <label htmlFor='engine capacity'>Engine capacity:</label>
               <Input type='number' placeholder='cm3' name='engine capacity' />
               <label htmlFor='horse power'>Engine capacity:</label>
               <Input type='number' placeholder='HP' name='horse power' id='horse power' />
               <label htmlFor='year'>Production year:</label>
               <Input type='year' placeholder='year' name='year' id='year' />
               <label htmlFor='fuel'>Fuel:</label>
               <Select optionsList={fuelsArr} id='fuel' />
               <label htmlFor='body type'>Body type:</label>
               <Select optionsList={carBodyTypesArr} id='body type' />
               <label htmlFor='transmition'>Transmition type:</label>
               <div className='space-x-6'>
                  <Button variant='primary' disabled>
                     Auto
                  </Button>
                  <Button variant='primary' disabled>
                     Manual
                  </Button>
               </div>
            </div>
         </div>
         <div className='flex flex-col gap-4'>
            <label htmlFor='desc'>Car description:</label>
            <textarea
               className='resize-none p-4 rounded-md outline-none'
               rows={8}
               // cols={40}
               id='desc'
               placeholder='Type the most important informations about your car'
               name='description'
            ></textarea>
            <LoadingButton className='mx-auto'>Create</LoadingButton>
         </div>
      </form>
   );
}

export default UploadFile;

// tytul
// cena
// model
// poj silnika
// moc silnika
// rok produkcji
// paliwo
// typ nadwozia

// przebieg
// kolor
// skrzynia
// stan techniczny (uszkodzone, nieuszkodzone)
// kraj pochodzenia
// naped
// opis
