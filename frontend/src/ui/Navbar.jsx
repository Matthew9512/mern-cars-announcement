import { useState } from 'react';
import { carIcon } from '../utils/icons';
import LinkButton from './LinkButton';
import { useLocation } from 'react-router-dom';
import { jwtDecodeToken } from '../api/axiosHelper';

function Navbar() {
   const [isLogged, setIsLogged] = useState(jwtDecodeToken);
   const location = useLocation();

   return (
      <nav className='flex justify-between w-full py-2 px-8'>
         <p className='flex items-center gap-2'>{carIcon} Car Rent</p>
         <div className='flex gap-4 items-center'>
            <p>lorem 1</p>
            <p>lorem 2</p>
         </div>
         {isLogged && location.pathname !== '/new-announcement' && (
            <LinkButton variant='primary' to='/new-announcement'>
               + Add New
            </LinkButton>
         )}
         <LinkButton variant='primary' to='/login'>
            {isLogged ? isLogged?.username : 'Login'}
         </LinkButton>
      </nav>
   );
}

export default Navbar;
