import { useEffect, useState } from 'react';

function TypingNotify({ socket, reciverId }) {
   const [whosTyping, setWhosTyping] = useState(false);

   useEffect(() => {
      if (socket.current)
         socket.current.on('isTyping', (user) => {
            setWhosTyping({ username: user?.username, senderId: user?.senderId });
            setTimeout(() => {
               setWhosTyping(false);
            }, 1500);
         });
   }, [socket]);

   return (
      <p className='italic absolute -top-10 -left-3 p-4 text-sm text-primary-grey'>
         {whosTyping && whosTyping?.senderId === reciverId && `${whosTyping?.username} typing...`}
      </p>
   );
}

export default TypingNotify;
