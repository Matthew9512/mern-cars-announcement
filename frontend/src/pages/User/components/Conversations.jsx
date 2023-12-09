import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import LoadingButton from '../../../ui/LoadingButton';
import Message from './Message';
import { useCreateChat, useCreateMsg, useGetChatMsg } from '../../../api/useChat';
import { sendIcon } from '../../../utils/icons';

function Conversations({ reciverId, senderId, socket, arrivalMessage }) {
   const scrollRef = useRef();
   let formRef = useRef();
   const [disabledSendBtn, setDisabledSendBtn] = useState(false);
   const { createChat } = useCreateChat();
   const { createNewMsg, isCreateMsgPending } = useCreateMsg();
   const { currentChatMsg, isGetChatMsgPending } = useGetChatMsg(reciverId, senderId);
   const [messages, setMessages] = useState([]);

   const handleMessageLength = () => {
      if (formRef.current.value.trim().length >= 1) return setDisabledSendBtn(true);

      setDisabledSendBtn(false);
   };

   // save message after enter press
   const handleEnterPress = (e) => {
      if (formRef.current.value.trim().length <= 1) return;
      if (e.code === 'Enter') {
         e.preventDefault();

         handleConversation(e);
      }
   };

   // create new conversation
   const handleConversation = (e) => {
      e.preventDefault();
      const newMsg = formRef.current.value;

      messages.length
         ? createNewMsg({
              reciverId,
              senderId,
              message: newMsg,
           })
         : createChat({
              reciverId,
              senderId,
              message: newMsg,
           });

      socket.current.emit('sendMessage', {
         senderId,
         reciverId,
         message: newMsg,
      });

      formRef.current.value = '';
      setDisabledSendBtn(false);
   };

   // display old messages
   useEffect(() => {
      if (!currentChatMsg?.length) return;

      setMessages(currentChatMsg);
   }, [currentChatMsg]);

   // display messages coming from socket
   // display proper message to current reciver
   useEffect(() => {
      arrivalMessage &&
         reciverId === arrivalMessage?.senderId &&
         setMessages((prev) =>
            [...prev, arrivalMessage].sort((a, b) => (a.created > b.created ? -1 : b.created > a.created ? 1 : 0))
         );
   }, [arrivalMessage]);

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <div className='flex-grow relative px-2'>
         {isGetChatMsgPending && <LoadingSpinner />}
         <div className='h-4/5 pr-1 overflow-y-scroll overflow-hidden flex flex-col-reverse'>
            {messages.length ? (
               messages.map((msg) => <Message key={msg?.created} msg={msg} senderId={senderId} />)
            ) : (
               <p className='text-center pb-16'>Choose contact to start a conversation or start chat with seller</p>
            )}
         </div>
         <form
            ref={scrollRef}
            onSubmit={handleConversation}
            onInput={handleMessageLength}
            className='mx-auto h-1/5 w-96 flex-center gap-2'
         >
            <textarea
               disabled={!reciverId}
               onKeyDown={handleEnterPress}
               ref={formRef}
               placeholder='Write message...'
               className='h-full border p-1 outline-none border-primary-blue rounded-md w-full resize-none'
               name='message'
            ></textarea>
            <LoadingButton
               isLoading={isCreateMsgPending}
               disabled={!reciverId || !disabledSendBtn}
               className='flex-center gap-2'
               type='submit'
            >
               {sendIcon} Send
            </LoadingButton>
         </form>
      </div>
   );
}

export default Conversations;
