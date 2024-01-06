import Select from '../../../ui/Select';
import { brandsArr, carBodyTypesArr, fuelsArr } from '../../../utils/constants';
import InputValidationMsg from './InputValidationMsg';
import Button from '../../../ui/Button';

const CarDetailsSelects = ({ formMethods }) => {
   const { register } = formMethods;
   const { errors } = formMethods.formState;

   const handleTransmitionBtns = (e) => {
      e.preventDefault();
      const click = e.target;

      if (!click.dataset.transmition) return;

      // take all btns
      const btns = click.closest('#transmition-wrapper').children;
      [...btns].forEach((btn) => btn.classList.remove('activeBtnTransmition'));

      click.classList.add('activeBtnTransmition');
   };

   return (
      <>
         <datalist id='brand-list-add'>
            {brandsArr.map((option) => (
               <option value={option} key={option}>
                  {option}
               </option>
            ))}
         </datalist>
         <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='fuel'>Fuel:</label>
            <Select
               optionsList={fuelsArr}
               id='fuel'
               name='fuel'
               className={errors.fuel?.message && 'error'}
               {...register('fuel', {
                  required: 'Select one option',
               })}
            />
            <InputValidationMsg errorMsg={errors.fuel?.message} />
         </div>
         <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='body type'>Body type:</label>
            <Select
               optionsList={carBodyTypesArr}
               id='body type'
               name='bodyType'
               className={errors.bodyType?.message && 'error'}
               {...register('bodyType', {
                  required: 'Select one option',
               })}
            />
            <InputValidationMsg errorMsg={errors.bodyType?.message} />
         </div>
         <div className='w-full'>
            <p className='pb-2'>Transmition type:</p>
            <div
               className='space-x-6 mb-2 mx-auto text-center'
               id='transmition-wrapper'
               onClick={handleTransmitionBtns}
            >
               <Button variant='outline' data-transmition='automatic'>
                  Automatic
               </Button>
               <Button variant='outline' className='activeBtnTransmition' data-transmition='manual'>
                  Manual
               </Button>
            </div>
         </div>
      </>
   );
};

export default CarDetailsSelects;
