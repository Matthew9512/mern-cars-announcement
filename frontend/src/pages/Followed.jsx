import { useState } from 'react';
import toast from 'react-hot-toast';
import { getLS } from '../utils/helpers';
import CarCard from './Home/components/CarCard';
import Empty from '../ui/Empty';
import Image from '../ui/Image';
import FollowButton from '../ui/FollowButton';

function Followed() {
   const [followList, setFollowList] = useState(getLS);

   const handleFollow = (e) => {
      const updatedLS = followList.filter((value) => value?._id !== e.currentTarget.dataset.id);
      setFollowList(updatedLS);
      localStorage.setItem('car__ads', JSON.stringify(updatedLS));

      toast.success(`You stopped following the selected ad`);
   };

   return (
      <>
         {!followList.length ? (
            <div className='px-8 py-16 relative lg:w-4/5 w-full mx-auto flex flex-col'>
               <div className='mx-auto'>
                  <Empty resourceName='followed ads'>
                     <span className=''>
                        Add the ad to your watch list in the search results or directly on the ad page.
                        <br /> Thanks to this, you can browse and compare vehicles that interest you.
                     </span>
                  </Empty>
                  <div className='lg:w-[26em] h-[26em] mx-auto'>
                     <Image src='/no-follow.png' />
                  </div>
                  <p className='absolute bottom-0 left-1/2 -translate-x-1/2 font-bold'>
                     <a href='https://storyset.com/city'>
                        City illustrations by <span className='underline'>Storyset</span>
                     </a>
                  </p>
               </div>
            </div>
         ) : (
            <>
               <section className='w-[80%] py-24 mx-auto grid grid-cols-[repeat(auto-fill,minmax(16em,1fr))] place-items-center gap-y-8 relative min-h-[16em]'>
                  <p className='absolute top-4 left-0 font-semibold text-lg'>Followed annoucement list:</p>
                  {followList.map((item) => (
                     <div key={item?._id} className='relative'>
                        <CarCard item={item} />
                        <FollowButton
                           item={item}
                           follow={true}
                           handleFollow={handleFollow}
                           position='absolute -top-7 right-0'
                        />
                     </div>
                  ))}
               </section>
            </>
         )}
      </>
   );
}

export default Followed;
