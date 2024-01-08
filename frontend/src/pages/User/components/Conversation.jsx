import { useContext, useEffect, useMemo, useRef } from 'react';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import Message from './Message';
import ConversationHomeScreen from './ConversationHomeScreen';
import { useGetChatMsg } from '../../../api/useChat';
import { useOnScreen } from '../../../api/useOnScreen';
import { MessagesContext } from '../../../context/messagesContext';
import { chatMembersData } from '../../../utils/helpers';

function Conversation({ reciverId, user, messages, setMessages, page, setPage }) {
   const { arrivalMessage } = useContext(MessagesContext);
   const infScrollEle = useRef(null);
   const isOnScreen = useOnScreen(infScrollEle);
   const { currentChatMsg, isGetChatMsgPending } = useGetChatMsg(reciverId, user?._id, page);
   const chatMembers = useMemo(() => chatMembersData(currentChatMsg, user), [currentChatMsg, user]);

   // display old messages
   useEffect(() => {
      if (!currentChatMsg?.find?.length) return;

      setMessages((prev) => [...prev, ...currentChatMsg.find]);
   }, [currentChatMsg]);

   // display messages coming from socket and display proper message to current reciver
   useEffect(() => {
      arrivalMessage &&
         reciverId === arrivalMessage?.senderId &&
         setMessages((prev) =>
            [...prev, arrivalMessage].sort((a, b) => (a.created > b.created ? -1 : b.created > a.created ? 1 : 0))
         );
   }, [arrivalMessage]);

   // fetch new messages when reaching the top
   useEffect(() => {
      if (!reciverId || !isOnScreen || !messages.length) return;
      if (page >= currentChatMsg?.pagesAmount) return;

      setPage((prev) => prev + 1);
   }, [isOnScreen]);

   return (
      <>
         {isGetChatMsgPending && <LoadingSpinner />}
         <div
            id='scrollEle'
            className={`${
               reciverId ? 'shadow-top' : ''
            } h-[90%] md:pr-1 pb-4 overflow-y-scroll overflow-hidden flex flex-col-reverse`}
         >
            {messages.length ? (
               messages.map((msg) => <Message key={msg?._id} msg={msg} user={user} chatMembers={chatMembers} />)
            ) : !reciverId ? (
               <ConversationHomeScreen />
            ) : (
               'Write a message to finish starting a new conversation with seller'
            )}
            <p className='invisible' ref={infScrollEle}>
               infScrollEle
            </p>
         </div>
      </>
   );
}

export default Conversation;
