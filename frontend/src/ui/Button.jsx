import { twMerge } from 'tailwind-merge';

function Button({ children, variant, className, ...props }) {
   const mainStyle = 'rounded-3xl py-2 px-4 outline-none';
   const styles = {
      primary: `${mainStyle} bg-primary-blue text-primary-white hover:bg-secondary-blue duration-150 disabled:bg-secondary-grey disabled:cursor-not-allowed`,
      outline: `${mainStyle} border border-secondary-grey bg-primary-white hover:shadow-md duration-150`,
      secondary: `${mainStyle} bg-primary-white text-primary-blue`,
      'nav-link': `pb-2 outline-none border-b border-primary-blue text-primary-blue font-semibold`,
   };

   return (
      <button className={twMerge(`${styles[variant]}`, className)} {...props}>
         {children}
      </button>
   );
}

export default Button;
