import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import UsersNavbar from './UsersNavbar';
import ContactList from './ContactList';
import Conversation from './Conversation';
import { UserContext } from '../../../context/userContext';
import MessagesForm from './MessagesForm';
import { MessagesContext } from '../../../context/messagesContext';

function Messenger() {
   const { id } = useParams();
   const { user } = useContext(UserContext);
   const { socket } = useContext(MessagesContext);
   const [messages, setMessages] = useState([]);
   let [page, setPage] = useState(1);

   // reset states to prevent displaying wrong messages
   const resetMessages = () => {
      setMessages([]);
      setPage(1);
   };

   return (
      <section className='bg-secondary-white pt-4 relative'>
         <UsersNavbar />
         <article className='lg:w-4/5 w-full h-[75vh] mx-auto flex '>
            <ContactList reciverId={id} user={user} resetMessages={resetMessages} />
            <div className='relative px-2 w-full'>
               <Conversation
                  reciverId={id}
                  user={user}
                  messages={messages}
                  setMessages={setMessages}
                  page={page}
                  setPage={setPage}
               />
               <MessagesForm socket={socket} reciverId={id} user={user} messages={messages} setMessages={setMessages} />
            </div>
         </article>
      </section>
   );
}

export default Messenger;
