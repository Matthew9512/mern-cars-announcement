import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import LoadingButton from '../../ui/LoadingButton';
import { useAddNewOffer } from '../../api/useOffer';
import { UserContext } from '../../context/userContext';
import InputValidationMsg from './components/InputValidationMsg';
import ImageInput from './components/ImageInput';
import SellerInputs from './components/SellerInputs';
import CarDetailsSelects from './components/CarDetailsSelects';
import CarDetailsInputs from './components/CarDetailsInputs';

function NewAnnouncement() {
   const { user } = useContext(UserContext);
   const { mutate, isPending } = useAddNewOffer(user?._id);
   const [uploadedImgArr, setUploadedImgArr] = useState([]);

   const formMethods = useForm({
      defaultValues: {
         city: user?.city,
         contactPerson: user?.contactPerson,
         telNumber: user?.telNumber,
         sellerId: user?._id,
      },
   });

   const { handleSubmit, register, setValue, getValues } = formMethods;
   const { errors } = formMethods.formState;

   const handleSubmitForm = () => {
      // users id from token
      if (!user?._id) return toast.error(`Please log in in order to finish`);
      if (uploadedImgArr.length >= 11) return toast.error(`You can upload more than 10 images`);
      // transmition type based on active class
      const transmitionType = document.querySelector('.activeBtnTransmition').textContent.toLowerCase();

      // stringifyed version of images links array, parse on backend
      setValue('images', JSON.stringify(uploadedImgArr));
      setValue('transmitionType', transmitionType);

      const formData = getValues();
      const { city, telNumber, contactPerson, sellerId, ...carData } = formData;
      const sellerData = { city, telNumber, contactPerson, sellerId };

      mutate({ carData, sellerData });
   };

   return (
      <section className='flex-center bg-secondary-white'>
         <form onSubmit={handleSubmit(handleSubmitForm)} className='py-16'>
            <h1 className='font-semibold text-2xl mx-auto pb-8'>Add New Announcement</h1>
            <div className='grid lg:grid-cols-2 grid-cols-1 place-items-center gap-x-4'>
               <CarDetailsInputs formMethods={formMethods} />
               <CarDetailsSelects formMethods={formMethods} />
               <ImageInput
                  uploadedImgArr={uploadedImgArr}
                  setUploadedImgArr={setUploadedImgArr}
                  formMethods={formMethods}
               />
            </div>
            <div className='flex flex-col gap-2'>
               <label htmlFor='desc'>Car description:</label>
               <textarea
                  className={`${errors.description?.message && 'error'} resize-none p-4 rounded-md outline-none`}
                  rows={6}
                  id='desc'
                  placeholder='Type the most important informations about your car'
                  name='description'
                  {...register('description', {
                     required: 'This field is required',
                     validate: (value) => (Number(value.trim().length) <= 20 ? 'Min 20 letters required' : true),
                  })}
               ></textarea>
               <InputValidationMsg errorMsg={errors.description?.message} />
               <SellerInputs formMethods={formMethods} />
               <LoadingButton isLoading={isPending} className='mx-auto'>
                  Create
               </LoadingButton>
            </div>
         </form>
      </section>
   );
}

export default NewAnnouncement;
