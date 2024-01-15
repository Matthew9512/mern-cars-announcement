import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from '../../../ui/LoadingButton';
import { sendIcon } from '../../../utils/icons';
import { useCreateChat, useCreateMsg } from '../../../api/useChat';
import TypingNotify from './TypingNotify';

function MessagesForm({ socket, user, reciverId, messages, setMessages }) {
   let formRef = useRef();
   const [disabledSendBtn, setDisabledSendBtn] = useState(false);
   const { createNewMsg, isCreateMsgPending } = useCreateMsg();
   const { createChat } = useCreateChat();

   const handleMessageLength = () => {
      if (formRef.current.value.trim().length >= 1) return setDisabledSendBtn(true);

      setDisabledSendBtn(false);
   };

   // save message after enter press
   const handleEnterPress = (e) => {
      if (formRef.current.value.trim().length <= 1) return;

      // send typing signal
      socket.current.emit('typing', { reciverId, senderId: user?._id, username: user?.username });

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
              senderId: user?._id,
              message: newMsg,
           })
         : createChat({
              reciverId,
              senderId: user?._id,
              message: newMsg,
              senderName: user?.username,
              senderAvatar: user?.usersAvatar,
           });

      socket.current.emit('sendMessage', {
         senderId: user?._id,
         reciverId,
         message: newMsg,
      });

      formRef.current.value = '';
      setDisabledSendBtn(false);

      if (!messages.length) return;

      setMessages((prev) =>
         [
            ...prev,
            { message: newMsg, created: new Date(Date.now()).toISOString(), senderId: user?._id, _id: uuidv4() },
         ].sort((a, b) => (a.created > b.created ? -1 : b.created > a.created ? 1 : 0))
      );

      setTimeout(() => {
         let scrollEle = document.querySelector('#scrollEle');
         scrollEle.scrollTop = scrollEle.scrollHeight;
      }, 200);
   };

   return (
      <form
         onSubmit={handleConversation}
         onInput={handleMessageLength}
         className='mx-auto h-[10%] flex-center gap-2 relative'
      >
         <TypingNotify socket={socket} reciverId={reciverId} />
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
   );
}

export default MessagesForm;
