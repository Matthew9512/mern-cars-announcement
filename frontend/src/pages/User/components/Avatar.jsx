function Avatar({ user, chat, username, onlineUsers, styleNewMessage, dimension }) {
   return (
      <div
         className='w-12 h-12 relative flex-none rounded-full flex-center font-bold text-lg uppercase bg-primary-grey'
         style={{ backgroundColor: user?._id === chat?.sellerId ? chat?.senderAvatar : chat?.reciverAvatar }}
      >
         <span>{username.at(0)}</span>
         <span
            className={`${
               onlineUsers && onlineUsers.find((u) => chat?.members.includes(u.userId))
                  ? 'bg-primary-green'
                  : 'bg-primary-grey'
            } absolute border-2 border-primary-white bottom-0 right-0 rounded-full w-4 h-4`}
         ></span>
         {styleNewMessage && dimension && (
            <span className='bg-primary-red absolute bottom-0 right-0 rounded-full w-4 h-4 z-30'></span>
         )}
      </div>
   );
}

export default Avatar;
