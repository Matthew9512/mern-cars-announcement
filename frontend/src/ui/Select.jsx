import { forwardRef } from 'react';

function Select({ optionsList, className, ...props }, ref) {
   return (
      <select
         className={`outline-none px-4 py-2 border border-secondary-grey shadow-sm rounded-lg min-w-[10rem] ${className}`}
         ref={ref}
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

export default forwardRef(Select);
