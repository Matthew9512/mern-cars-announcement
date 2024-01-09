import { githubIcon, linkedInIcon } from '../utils/icons';

function Footer() {
   return (
      <footer className='p-4 w-full mt-auto'>
         <p className='flex items-center justify-center gap-2'>
            made by Mateusz{' '}
            <span className='text-xl'>
               <a href='https://github.com/Matthew9512'>{githubIcon}</a>
            </span>
            <span className='text-xl'>
               <a href='https://www.linkedin.com/in/mateusz-maciak/'>{linkedInIcon}</a>
            </span>
         </p>
      </footer>
   );
}

export default Footer;
