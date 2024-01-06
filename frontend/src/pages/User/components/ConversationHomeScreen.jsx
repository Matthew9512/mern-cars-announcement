import Image from '../../../ui/Image';

function ConversationHomeScreen() {
   return (
      <div className='lg:w-72 lg:h-72 w-60 h-60 flex-center flex-col mx-auto'>
         <Image src='/messages.png' />
         <p className='absolute bottom-20 left-1/2 -translate-x-1/2 w-max font-bold'>
            <a href='https://storyset.com/online'>
               Online illustrations by <span className='underline'>Storyset</span>
            </a>
         </p>
         <p className='text-center pb-16 font-semibold opacity-70'>
            Choose contact to start a conversation or start chat with seller
         </p>
      </div>
   );
}

export default ConversationHomeScreen;
