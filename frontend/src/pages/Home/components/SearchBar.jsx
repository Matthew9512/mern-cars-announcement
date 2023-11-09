import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import LoadingButton from '../../../ui/LoadingButton';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';
import { brandsArr, fuelsArr, productionYearsArr } from '../../../utils/constants';
import { searchIcon } from '../../../utils/icons';
import { useSearchOffer } from '../../../api/useOffer';

function SearchBar() {
   const [disable, setDisable] = useState(true);
   let [searchParams, setSearchParams] = useSearchParams();
   const { data, error, isPending } = useSearchOffer(searchParams);

   const handleSearchForm = (e) => {
      e.preventDefault();

      searchParams.delete('page');

      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form);

      Object.entries(formData).map(([key, value]) => {
         if (!value) return searchParams.delete(key);

         searchParams.set(key.toLowerCase(), value.toLowerCase());
      });

      searchParams.set('page', 1);

      setSearchParams(searchParams);
   };

   // change disabled state of search btn
   const handleBtnState = (e) => {
      // check if user's value matches value from array of car brands
      const chooseOption = brandsArr.some((option) => option.toLowerCase() === e.target.value.toLowerCase());
      if (!chooseOption) return setDisable(true);
      setDisable(false);
   };

   console.log(data);

   return (
      <form
         id='searchForm'
         onSubmit={handleSearchForm}
         className='flex xl:flex-row flex-col gap-4 justify-between xl:w-4/5 xl:max-w-none max-w-[16rem] mx-auto py-12'
      >
         <Input onChange={handleBtnState} placeholder='brand' type='text' name='brand' list='brand-list' />
         <datalist id='brand-list'>
            {brandsArr.map((option) => (
               <option value={option} key={option}>
                  {option}
               </option>
            ))}
         </datalist>
         <Input placeholder='model' type='text' name='model' />
         <Select optionsList={fuelsArr} name='fuel' />
         <Select optionsList={productionYearsArr} name='year' />
         <LoadingButton isLoading={isPending} disabled={disable} className='flex gap-2 items-center mx-auto w-max'>
            {searchIcon} Cars
         </LoadingButton>
      </form>
   );
}

export default SearchBar;
