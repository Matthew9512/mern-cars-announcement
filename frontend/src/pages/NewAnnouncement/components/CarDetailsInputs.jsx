import Input from '../../../ui/Input';
import { newAnnForm } from '../../../utils/constants';
import InputValidationMsg from './InputValidationMsg';

function CarDetailsInputs({ formMethods }) {
   const { register } = formMethods;
   const { errors } = formMethods.formState;

   return (
      <>
         {newAnnForm.map((value) => (
            <div className='flex flex-col gap-2 w-full' key={value?.id}>
               <label htmlFor={value?.id}>{value?.text}</label>
               <Input
                  type={value?.type}
                  placeholder={value?.placeholder}
                  name={value?.name}
                  id={value?.id}
                  className={errors[value?.name]?.message && 'error'}
                  list={value?.list}
                  {...register(value?.name, {
                     required: value?.errorMessage,
                     minLength: value?.minLength,
                     validate: value?.validate,
                  })}
               />
               <InputValidationMsg errorMsg={errors[value?.name]?.message} />
            </div>
         ))}
      </>
   );
}

export default CarDetailsInputs;
