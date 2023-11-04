import { twMerge } from 'tailwind-merge';

function Button({ children, variant, className, ...props }) {
   const mainStyle = 'rounded-3xl py-2 px-4 outline-none';
   const styles = {
      primary: `${mainStyle} bg-primary-blue text-primary-white`,
      secondary: `${mainStyle} bg-primary-white text-primary-blue`,
   };

   return (
      <button className={twMerge(`${styles[variant]}`, className)} {...props}>
         {children}
      </button>
   );
}

export default Button;
