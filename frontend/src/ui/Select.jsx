function Select({ optionsList, ...props }) {
   return (
      <select
         className='outline-none px-4 py-2 border border-secondary-grey shadow-sm rounded-lg min-w-[10rem]'
         {...props}
      >
         {optionsList.map((option) => (
            <option key={option?.key} value={option?.key}>
               {option?.option}
            </option>
         ))}
      </select>
   );
}

export default Select;
