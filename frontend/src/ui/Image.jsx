import { twMerge } from 'tailwind-merge';

function Image({ className, ...props }) {
   return <img {...props} className={twMerge('w-full h-full object-cover', className)} />;
}

export default Image;
