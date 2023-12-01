import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

function Input({ className, ...props }, ref) {
   return (
      <input
         className={twMerge(
            `outline-none px-4 py-2 border border-secondary-grey shadow-sm rounded-lg placeholder:text-primary-black`,
            className
         )}
         ref={ref}
         {...props}
      />
   );
}

export default forwardRef(Input);
// import { twMerge } from 'tailwind-merge';

// function Input({ className, inpRef, ...props }) {
//    return (
//       <input
//          className={twMerge(
//             `outline-none px-4 py-2 border border-secondary-grey shadow-sm rounded-lg placeholder:text-primary-black`,
//             className
//          )}
//          ref={inpRef}
//          {...props}
//       />
//    );
// }

// export default Input;
