import { useRef, useState } from 'react';
import LoadingButton from '../../../ui/LoadingButton';
import { sendIcon } from '../../../utils/icons';
import { useCreateChat, useCreateMsg } from '../../../api/useChat';

function MessagesForm({ socket, user, reciverId, whosTyping, messages, setMessages }) {
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
      socket.current.emit('typing', { reciverId, username: user?.username });

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
           });

      socket.current.emit('sendMessage', {
         senderId: user?._id,
         reciverId,
         message: newMsg,
      });

      setMessages((prev) =>
         [...prev, { message: newMsg, created: new Date(Date.now()).toISOString(), senderId: user?._id }].sort((a, b) =>
            a.created > b.created ? -1 : b.created > a.created ? 1 : 0
         )
      );

      let scrollEle = document.querySelector('#scrollEle');
      scrollEle.scrollTop = scrollEle.scrollHeight;

      formRef.current.value = '';
      setDisabledSendBtn(false);
   };

   return (
      <form
         onSubmit={handleConversation}
         onInput={handleMessageLength}
         className='mx-auto h-1/5 w-96 flex-center gap-2 relative'
      >
         <p className='italic absolute -top-10 -left-3 p-4 text-sm text-primary-grey'>
            {whosTyping && `${whosTyping} typing...`}
         </p>
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
