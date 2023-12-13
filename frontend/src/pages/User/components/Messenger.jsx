import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import UsersNavbar from './UsersNavbar';
import ContactList from './ContactList';
import Conversation from './Conversation';
import { UserContext } from '../../../context/userContext';
import MessagesForm from './MessagesForm';

function Messenger() {
   const { id } = useParams();
   const { user } = useContext(UserContext);
   const socket = useRef();
   const [onlineUsers, setOnlineUsers] = useState(null);
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [whosTyping, setWhosTyping] = useState('');

   const [messages, setMessages] = useState([]);
   let [page, setPage] = useState(1);

   // prevent
   const resetMessages = () => {
      setMessages([]);
      setPage(1);
   };

   useEffect(() => {
      socket.current = io('ws://localhost:8000');
      socket.current.on('getMessage', (data) => {
         setArrivalMessage({
            senderId: data.senderId,
            message: data.message,
            created: new Date(Date.now()).toISOString(),
         });
      });
   }, []);

   useEffect(() => {
      if (!user) return;

      socket.current.emit('addUser', user?._id);
      socket.current.on('getUsers', (users) => {
         setOnlineUsers(users);
      });
   }, [user]);

   useEffect(() => {
      socket.current.on('isTyping', (username) => {
         setWhosTyping(username);
         setTimeout(() => {
            setWhosTyping('');
         }, 2000);
      });
   }, []);

   return (
      <section className='bg-secondary-white pt-8 relative'>
         <UsersNavbar />
         <article className='lg:w-4/5 w-full h-[70vh] mx-auto flex'>
            <ContactList reciverId={id} user={user} onlineUsers={onlineUsers} resetMessages={resetMessages} />
            <div className='flex-grow relative px-2'>
               <Conversation
                  reciverId={id}
                  user={user}
                  arrivalMessage={arrivalMessage}
                  messages={messages}
                  setMessages={setMessages}
                  page={page}
                  setPage={setPage}
               />
               <MessagesForm
                  socket={socket}
                  reciverId={id}
                  user={user}
                  whosTyping={whosTyping}
                  messages={messages}
                  setMessages={setMessages}
               />
            </div>
         </article>
      </section>
   );
}

export default Messenger;
