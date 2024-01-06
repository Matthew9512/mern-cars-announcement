import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { carIcon } from '../utils/icons';
import LinkButton from './LinkButton';
import { jwtDecodeToken } from '../api/axiosHelper';
import { MessagesContext } from '../context/messagesContext';

function Navbar() {
   const [isLogged] = useState(jwtDecodeToken);
   const location = useLocation();
   const { newMessageNotifyDot } = useContext(MessagesContext);
   const [navbarVis, setNavbarVis] = useState(false);
   const navBtn = useRef();
   const navRef = useRef();

   // toggle navbar visibility
   const toggleNavbar = (e) => {
      const click = e.target;
      if (navBtn.current.contains(click)) setNavbarVis((prev) => !prev);
      if (click.classList.contains('navbar__btn')) setNavbarVis(false);
   };

   // toggle nav menu vis when user clicks outside of nav menu when menu is vis
   useEffect(() => {
      if (!navbarVis) return;
      const handleOusideClick = (e) => {
         if (!navRef.current.contains(e.target)) setNavbarVis(false);
      };

      document.addEventListener('click', handleOusideClick);

      return () => document.removeEventListener('click', handleOusideClick);
   }, [navbarVis]);

   return (
      <nav ref={navRef} onClick={toggleNavbar} className='flex justify-between items-center h-16 w-full py-2 px-8'>
         <LinkButton to='/' className='flex items-center gap-2 text-lg'>
            {carIcon} Car Rent
         </LinkButton>
         <input type='checkbox' id='navbar-check' className='hidden' />
         <div className='relative'>
            <span className={`sm:hidden ${newMessageNotifyDot >= 1 ? 'notificationDot' : ''}`}></span>
            <label ref={navBtn} htmlFor='navbar-check' className='sm:hidden flex flex-col hover:cursor-pointer'>
               <span className='w-7 h-2 border-t-4 border-t-primary-blue'></span>
               <span className='w-7 h-2 border-t-4 border-t-primary-blue'></span>
               <span className='w-7 h-2 border-t-4 border-t-primary-blue'></span>
            </label>
         </div>
         <ul className={`navbar__items-wrapper ${navbarVis ? 'show' : 'hide'}`}>
            <LinkButton to='/followed' variant='primary' className='sm:ml-4 navbar__btn'>
               Followed
            </LinkButton>
            {isLogged && location.pathname !== '/new-announcement' && (
               <LinkButton to='/new-announcement' variant='primary' className='navbar__btn'>
                  + Add New
               </LinkButton>
            )}
            <LinkButton
               to={isLogged ? 'user' : 'login'}
               variant='primary'
               className='sm:ml-4 relative capitalize navbar__btn'
            >
               {isLogged ? isLogged?.username : 'Login'}
               <span className={`${newMessageNotifyDot >= 1 ? 'notificationDot' : ''}`}></span>
            </LinkButton>
         </ul>
      </nav>
   );
}

export default Navbar;
