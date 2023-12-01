import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../../../ui/Input';
import LoadingButton from '../../../ui/LoadingButton';
import { useFileUpload } from '../../../utils/firebase';
import Button from '../../../ui/Button';
import Select from '../../../ui/Select';
import UploadedImgs from './UploadedImgs';
import { brandsArr, carBodyTypesArr, fuelsArr } from '../../../utils/constants';
import { useAddNewOffer } from '../../../api/useOffer';
import { jwtDecodeToken } from '../../../api/axiosHelper';
import { useGetSeller } from '../../../api/useAuth';

function UploadFile() {
   const { mutate, isPending } = useAddNewOffer();
   const { data: sellerData } = useGetSeller();
   const [files, setFiles] = useState([]);
   const [uploadedImgArr, setUploadedImgArr] = useState([]);
   const { handleFileUpload, filePerc, err, loading } = useFileUpload(setUploadedImgArr);
   const uploadRef = useRef();

   const handleTransmition = (e) => {
      e.preventDefault();
      const click = e.target;

      if (!click.dataset.transmition) return;

      // take all btns
      const btns = click.closest('#transmition-wrapper').children;
      [...btns].forEach((btn) => btn.classList.remove('activeBtnTransmition'));

      click.classList.add('activeBtnTransmition');
   };

   const handleSubmitForm = (e) => {
      e.preventDefault();
      if (uploadedImgArr.length >= 11) return toast.error(`You can upload more than 10 images`);

      // transmition type based on active class
      const transmitionType = document.querySelector('.activeBtnTransmition').textContent.toLowerCase();

      // users id from token
      const decoded = jwtDecodeToken();

      if (!decoded) return toast.error(`Please log in in order to finish`);
      const form = new FormData(e.currentTarget);

      // stringifyed version of images links array, parse on backend
      form.append('images', JSON.stringify(uploadedImgArr));
      form.append('transmitionType', transmitionType);
      form.append('userId', decoded?.id);

      const { city, telNumber, contactPerson, ...carData } = Object.fromEntries(form);
      const sellerData = { city, telNumber, contactPerson };

      mutate({ carData, sellerData });
   };

   useEffect(() => {
      if (!files.length) return;

      // invoke uploading fn for every image
      [...files[0]].forEach((img) => {
         handleFileUpload(img);
      });

      // clear images arr to remove duplicates
      setFiles([]);
   }, [files]);
   console.log(sellerData);
   return (
      <form onSubmit={handleSubmitForm} className='py-16'>
         <h1 className='font-semibold text-2xl mx-auto pb-8'>Add New Announcement</h1>
         <div className='flex lg:flex-row flex-col lg:gap-16 gap-8'>
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
               <div className='flex-center gap-4 my-4'>
                  <label>Pick photos (max 6)</label>
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
               <UploadedImgs
                  uploadedImgArr={uploadedImgArr}
                  setUploadedImgArr={setUploadedImgArr}
                  filePerc={filePerc}
               />
               <label htmlFor='price'>Price:</label>
               <Input type='number' placeholder='€' name='price' id='price' />
            </div>
            <div className='flex flex-col gap-2 w-72'>
               <label htmlFor='engine capacity'>Engine capacity:</label>
               <Input type='number' placeholder='cm3' name='engineCapacity' />
               <label htmlFor='horse power'>Horse power:</label>
               <Input type='number' placeholder='HP' name='horsePower' id='horse power' />
               <label htmlFor='year'>Production year:</label>
               <Input type='year' placeholder='year' name='year' id='year' />
               <label htmlFor='fuel'>Fuel:</label>
               <Select optionsList={fuelsArr} id='fuel' name='fuel' />
               <label htmlFor='body type'>Body type:</label>
               <Select optionsList={carBodyTypesArr} id='body type' name='bodyType' />
               <label htmlFor='transmition'>Transmition type:</label>
               <div className='space-x-6 mb-2 mx-auto' id='transmition-wrapper' onClick={handleTransmition}>
                  <Button variant='primary' data-transmition='automatic'>
                     Automatic
                  </Button>
                  <Button variant='primary' data-transmition='manual'>
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
            <span className='font-semibold text-xl py-8'>Seller details</span>
            <label htmlFor='city'>City:</label>
            <Input type='text' placeholder='city' name='city' id='city' defaultValue={sellerData?.city} />
            <label htmlFor='contact person'>Contact person:</label>
            <Input
               type='text'
               placeholder='contact person'
               name='contactPerson'
               id='contact person'
               defaultValue={sellerData?.contactPerson}
            />
            <label htmlFor='tel number'>Tel number:</label>
            <Input
               type='tel'
               placeholder='tel number'
               name='telNumber'
               id='tel number'
               defaultValue={sellerData?.telNumber}
            />
            <LoadingButton isLoading={isPending} className='mx-auto'>
               Create
            </LoadingButton>
         </div>
      </form>
   );
}

export default UploadFile;

// // export const testing = ['brand', 'model', 'fuel', 'Toyota', 'Volkswagen', 'Volvo'];
// // console.log(testing);

// // const [curretnInput, setCurretnInput] = useState(0);
// // const lestGo = () => {};
// // const handleSetCurrentInput = (e) => {
// //    const current = e.target;
// //    if (current.value.length >= 5) return;
// //    if (current.value.length > 3) return setCurretnInput((prev) => prev + 1);
// // };
// // console.log(curretnInput);
// // return (
// //    <form onSubmit={lestGo} onChange={handleSetCurrentInput} className='py-16'>
// //       <div className='flex flex-col'>
// //          {testing.map((value, i) => (
// //             <div key={i}>
// //                <label htmlFor={value}>{value}:</label>
// //                <Input
// //                   data-index={i}
// //                   type='text'
// //                   disabled={i > curretnInput}
// //                   placeholder={value}
// //                   name={value}
// //                   id={value}
// //                   required
// //                />
// //             </div>
// //          ))}
// //       </div>
// //    </form>
// // );
