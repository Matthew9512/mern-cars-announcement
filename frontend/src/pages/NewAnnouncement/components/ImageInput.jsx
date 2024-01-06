import { useEffect, useRef, useState } from 'react';
import Input from '../../../ui/Input';
import { useFileUpload } from '../../../utils/firebase';
import UploadedImgs from './UploadedImgs';
import InputValidationMsg from './InputValidationMsg';
import LoadingButton from '../../../ui/LoadingButton';

function ImageInput({ uploadedImgArr, setUploadedImgArr, formMethods }) {
   const { handleFileUpload, loading } = useFileUpload(setUploadedImgArr);
   const [files, setFiles] = useState([]);
   const uploadRef = useRef();
   const { clearErrors, register, setError } = formMethods;
   const { errors } = formMethods.formState;

   useEffect(() => {
      if (!files.length) return;

      // invoke uploading fn for every image
      [...files[0]].forEach((img) => {
         handleFileUpload(img);
      });
      clearErrors('images');

      // clear images arr to remove duplicates
      setFiles([]);
   }, [files]);

   return (
      <>
         <Input
            {...register('images', {
               validate: () => uploadedImgArr?.length > 0 || 'At least on image of your car is required',
            })}
            ref={uploadRef}
            onChange={(e) => {
               setFiles((prev) => [...prev, e.target.files]);
            }}
            variant='upload'
            type='file'
            hidden
            multiple
            accept='image/*'
            placeholder='name'
         />
         <div>
            <div className={`${errors?.images?.message && 'error'} rounded-md flex-center gap-4 my-4`}>
               <label className='underline'>Pick photos (max 6)</label>
               <LoadingButton
                  className='mx-auto'
                  onClick={(e) => {
                     e.preventDefault();
                     uploadRef.current.click();
                  }}
                  isLoading={loading}
               >
                  Add photos
               </LoadingButton>
            </div>
            <InputValidationMsg errorMsg={errors.images?.message} />
            <UploadedImgs uploadedImgArr={uploadedImgArr} setUploadedImgArr={setUploadedImgArr} setError={setError} />
         </div>
      </>
   );
}

export default ImageInput;
