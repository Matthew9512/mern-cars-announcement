import { useForm } from 'react-hook-form';
import Input from '../../../ui/Input';
import { useState } from 'react';

const InputComponent = () => {
   const {
      handleSubmit,
      register,
      watch,
      formState: { errors },
   } = useForm();
   const [curretnInput, setCurretnInput] = useState(0);
   const lestGo = (data) => {
      console.log(data);
   };
   const handleSetCurrentInput = (e) => {
      const current = e.target;
      if (current.value.length >= 5) return;
      if (current.value.length > 3) return setCurretnInput((prev) => prev + 1);
   };
   const testing = ['brand', 'model', 'fuel', 'Toyota', 'Volkswagen', 'Volvo'];
   console.log(watch());
   console.log(errors);
   return (
      <form onSubmit={handleSubmit(lestGo)}>
         <input
            id='name'
            className={errors?.name?.message ? 'error' : 'no-error'}
            {...register('name', {
               required: 'Account reference is required',
            })}
         />
         <span>{errors.name?.message}</span>
         <input type='submit' />
      </form>
   );
};

export default InputComponent;
// {testing.map((value, i) => (
//    <div key={i}>
//       <label htmlFor={value}>{value}:</label>
//       <input
//          data-index={i}
//          type='text'
//          // disabled={i > curretnInput}
//          placeholder={value}
//          name={value}
//          id={value}
//          {...register('fuel', { required: 'hit is important' })}
//       />
//       <span>{errors.fuel?.message}</span>
//    </div>
// ))}
