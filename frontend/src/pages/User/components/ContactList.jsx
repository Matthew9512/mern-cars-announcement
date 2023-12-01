import { generatePath, useNavigate } from 'react-router-dom';
import Input from '../../../ui/Input';
import ContactItem from './ContactItem';

function ContactList() {
   // const navigate = useNavigate();

   // const handleCurrentChat = (id) => {
   //    navigate(generatePath('/user/messages/:id', { id }));
   // };

   const handleSearchContact = (e) => {
      console.log(e.target.value);
   };

   return (
      <aside className='flex flex-col items-start overflow-auto bg-secondary-blue sm:w-96 w-40'>
         <Input
            onChange={handleSearchContact}
            className='sm:w-full w-12 mx-auto'
            type='text'
            placeholder='search for someone xd'
         />
         <ContactItem />
         <ContactItem />
         <ContactItem />
      </aside>
   );
}

export default ContactList;
