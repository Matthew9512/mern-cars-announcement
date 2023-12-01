import Image from '../../../ui/Image';

function Message({ scrollRef }) {
   let owner = Math.round(Math.random() + 1);
   return (
      <div ref={scrollRef} className={`flex my-2 ${owner % 2 === 0 ? 'justify-start' : 'justify-end'} `}>
         <div className={`grid grid-cols-[2rem,80%] gap-2 place-items-start`}>
            <div className='h-8 border border-primary-grey rounded-full'>
               <Image src='/404-robot-com.jpg' className='rounded-full' alt='contact image' />
            </div>
            <p
               className={`${
                  owner % 2 === 0 ? 'bg-primary-blue text-primary-white' : 'bg-primary-white'
               } p-1 rounded-md`}
            >
               place for message
            </p>
            <span className='text-sm italic opacity-60 col-span-2'>created</span>
         </div>
      </div>
   );
}

export default Message;
