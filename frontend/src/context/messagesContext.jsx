import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './userContext';

export const MessagesContext = createContext({});

export const MessagesContextProvider = ({ children }) => {
   const { user, unseenChats } = useContext(UserContext);
   let socket = useRef(io('ws://localhost:8000'));
   const [newMessageNotifyDot, setNewMessageNotifyDot] = useState(0);
   const [onlineUsers, setOnlineUsers] = useState(null);
   const [arrivalMessage, setArrivalMessage] = useState(null);

   useEffect(() => {
      socket.current.on('getMessage', (data) => {
         const id = window.location.pathname;

         data?.senderId === id.substring(15) ? setNewMessageNotifyDot(false) : setNewMessageNotifyDot(true);
         setArrivalMessage({
            senderId: data.senderId,
            reciverId: data.reciverId,
            message: data.message,
            created: new Date(Date.now()).toISOString(),
            _id: uuidv4(),
         });
         setTimeout(() => {
            let scrollEle = document.querySelector('#scrollEle');
            scrollEle.scrollTop = scrollEle.scrollHeight;
         }, 300);
      });
   }, []);

   useEffect(() => {
      if (!user) return;

      socket.current.emit('addUser', user?._id);
      socket.current.on('getUsers', (users) => {
         setOnlineUsers(users.filter((u) => u.userId !== user?._id));
      });
   }, [user]);
   // useEffect(() => {
   //    if (!user) return;

   //    socket.current.emit('addUser', user?._id);
   //    socket.current.on('getUsers', (users) => {
   //       setOnlineUsers(users);
   //    });
   // }, [user]);

   useEffect(() => {
      if (!user) return;

      setNewMessageNotifyDot(unseenChats);
   }, [user]);

   return (
      <MessagesContext.Provider
         value={{
            user,
            newMessageNotifyDot,
            setNewMessageNotifyDot,
            arrivalMessage,
            setArrivalMessage,
            socket,
            onlineUsers,
            setOnlineUsers,
         }}
      >
         {children}
      </MessagesContext.Provider>
   );
};
