import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';
import { brandsArr, fuelsArr, productionYearsArr } from '../../../utils/constants';
import { searchIcon } from '../../../utils/icons';

function SearchBar() {
   const handleSearchForm = (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form);

      console.log(formData);

      // clear form values
      document.querySelector('#searchForm').reset();
   };

   return (
      <form
         id='searchForm'
         onSubmit={handleSearchForm}
         className='flex xl:flex-row flex-col gap-4 justify-between xl:w-4/5 xl:max-w-none max-w-[16rem] mx-auto py-12'
      >
         <Input placeholder='brand' type='text' name='brand' list='brand-list' />
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
         <Button variant='primary' className='flex gap-2 items-center mx-auto w-max'>
            {searchIcon} Car
         </Button>
      </form>
   );
}

export default SearchBar;
