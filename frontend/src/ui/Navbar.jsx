import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { carIcon } from '../utils/icons';
import LinkButton from './LinkButton';
import { jwtDecodeToken } from '../api/axiosHelper';

function Navbar() {
   const [isLogged, setIsLogged] = useState(jwtDecodeToken);
   const location = useLocation();

   return (
      <nav className='flex justify-between items-center w-full py-2 px-8'>
         <LinkButton to='/' className='flex items-center gap-2 text-lg'>
            {carIcon} Car Rent
         </LinkButton>
         <div className='space-x-2'>
            <LinkButton variant='primary' to='/followed' className='ml-4'>
               Followed
            </LinkButton>
            {isLogged && location.pathname !== '/new-announcement' && (
               <LinkButton variant='primary' to='/new-announcement'>
                  + Add New
               </LinkButton>
            )}
            <LinkButton variant='primary' to='/login' className='ml-4'>
               {isLogged ? isLogged?.username : 'Login'}
            </LinkButton>
         </div>
      </nav>
   );
}

export default Navbar;
