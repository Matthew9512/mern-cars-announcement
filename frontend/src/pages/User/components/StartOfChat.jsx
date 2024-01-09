function StartOfChat({ chatMembers }) {
   return (
      <div className='flex-center flex-col gap-2 capitalize font-bold border-b border-secondary-grey pb-4 mb-4'>
         <div
            className='w-12 h-12 relative flex-none rounded-full flex-center flex-col text-lg mx-auto'
            style={{ backgroundColor: chatMembers?.reciversAvatar }}
         >
            <p>{chatMembers?.reciversName?.at(0)}</p>
         </div>
         <p>{chatMembers?.reciversName}</p>
      </div>
   );
}

export default StartOfChat;
