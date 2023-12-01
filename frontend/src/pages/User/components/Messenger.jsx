import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import UsersNavbar from './UsersNavbar';
import ContactList from './ContactList';
import Conversations from './Conversations';
import { UserContext } from '../../../context/userContext';

function Messenger() {
   const { id } = useParams();
   const { user } = useContext(UserContext);

   return (
      <section className='bg-secondary-white pt-8 relative'>
         <UsersNavbar />
         {/* flex lg:flex-row flex-col */}
         <article className='lg:w-4/5 w-full h-[70vh] mx-auto flex'>
            <ContactList />
            <Conversations />
         </article>
      </section>
   );
}

export default Messenger;
