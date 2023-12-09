import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import UsersNavbar from './UsersNavbar';
import ContactList from './ContactList';
import Conversations from './Conversations';
import { UserContext } from '../../../context/userContext';

function Messenger() {
   const { id } = useParams();
   const { user } = useContext(UserContext);
   const socket = useRef();
   const [onlineUsers, setOnlineUsers] = useState(null);
   const [arrivalMessage, setArrivalMessage] = useState(null);

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

   return (
      <section className='bg-secondary-white pt-8 relative'>
         <UsersNavbar />
         <article className='lg:w-4/5 w-full h-[70vh] mx-auto flex'>
            <ContactList reciverId={id} senderId={user?._id} onlineUsers={onlineUsers} />
            <Conversations reciverId={id} senderId={user?._id} socket={socket} arrivalMessage={arrivalMessage} />
         </article>
      </section>
   );
}

export default Messenger;
