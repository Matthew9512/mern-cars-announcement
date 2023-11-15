import { useLocation } from 'react-router-dom';
import LinkButton from '../../../ui/LinkButton';

function UsersNavbar() {
   const { pathname } = useLocation();

   return (
      <div className='flex justify-center items-center mx-auto gap-8 border-b border-b-secondary-grey/60 w-max mb-16'>
         <LinkButton to='/user' variant={pathname === '/user' ? 'nav-link' : ''}>
            My profile
         </LinkButton>
         <LinkButton to='/user/announcements' variant={pathname === '/user/announcements' ? 'nav-link' : ''}>
            My announcements
         </LinkButton>
         <LinkButton to='/user/users-data' variant={pathname === '/user/users-data' ? 'nav-link' : ''}>
            My data
         </LinkButton>
      </div>
   );
}

export default UsersNavbar;
