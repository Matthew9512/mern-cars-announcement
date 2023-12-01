import { useContext, useRef } from 'react';
import Button from '../../../ui/Button';
import { UserContext } from '../../../context/userContext';
import Message from './Message';

function Conversations() {
   const { user } = useContext(UserContext);
   const scrollRef = useRef();
   const formRef = useRef();

   // save message after enter press
   const handleEnterPress = (e) => {
      if (e.code == 'Enter') {
         e.preventDefault();
         handleConversation(e);
      }
   };

   // create new conversation
   const handleConversation = (e) => {
      e.preventDefault();

      console.log(formRef.current.value);
   };

   // useEffect(() => {
   //    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
   // }, [messages]);

   return (
      <div className='flex-grow'>
         <div className='h-4/5 pr-1 overflow-y-scroll overflow-hidden'>
            <p>Tap to start a conversation</p>
            <Message />
            <Message />
            <Message />
         </div>
         <form onSubmit={handleConversation} className='mx-auto h-1/5 w-96 flex-center gap-2'>
            <textarea
               onKeyDown={handleEnterPress}
               ref={formRef}
               placeholder='Write message...'
               className='h-full border p-1 outline-none border-primary-blue rounded-md w-full resize-none'
               name='message'
            ></textarea>
            <Button type='submit' variant='primary'>
               Send
            </Button>
         </form>
      </div>
   );
}

export default Conversations;
