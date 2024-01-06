import Input from '../../../ui/Input';
import InputValidationMsg from './InputValidationMsg';

function SellerInputs({ formMethods }) {
   const { register } = formMethods;
   const { errors } = formMethods.formState;
   const defValues = formMethods.control._defaultValues;

   return (
      <>
         <span className='font-semibold text-xl py-4'>Seller details</span>
         <label htmlFor='city'>City:</label>
         <Input
            type='text'
            placeholder='city'
            name='city'
            id='city'
            className={errors.city?.message && 'error'}
            defaultValue={defValues?.city}
            {...register('city', {
               required: 'This field is required',
               minLength: {
                  value: 3,
                  message: 'City name must be longer than 3 letters',
               },
            })}
         />
         <InputValidationMsg errorMsg={errors.city?.message} />
         <label htmlFor='contact person'>Contact person:</label>
         <Input
            type='text'
            placeholder='contact person'
            name='contactPerson'
            id='contact person'
            className={errors.contactPerson?.message && 'error'}
            defaultValue={defValues?.contactPerson}
            {...register('contactPerson', {
               required: 'This field is required',
               minLength: {
                  value: 3,
                  message: 'Persons name must be longer than 3 letters',
               },
            })}
         />
         <InputValidationMsg errorMsg={errors.contactPerson?.message} />
         <label htmlFor='tel number'>Tel number:</label>
         <Input
            type='tel'
            placeholder='tel number'
            name='telNumber'
            id='tel number'
            maxLength={9}
            className={errors.telNumber?.message && 'error'}
            defaultValue={defValues?.telNumber}
            {...register('telNumber', {
               required: 'This field is required',
               pattern: {
                  value: /^[0-9]+$/,
                  message: 'Incorrect tel number',
               },
            })}
         />
         <InputValidationMsg errorMsg={errors.telNumber?.message} />
      </>
   );
}

export default SellerInputs;
