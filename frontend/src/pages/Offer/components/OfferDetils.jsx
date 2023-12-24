import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatResData, formatTime, getLS } from '../../../utils/helpers';
import FollowButton from '../../../ui/FollowButton';

/**
 * @todo ugly dest
 */

function OfferDetils({ data }) {
   const { images, _id, __v, created, seller, features, ...resData } = data;
   const resDataCopy = formatResData(resData);
   const [follow, setFollow] = useState(() => {
      const lsItems = getLS();

      const findItem = lsItems.find((value) => value._id === data?._id);
      return findItem ? true : false;
   });

   const handleFollow = (e) => {
      const value = e.currentTarget.dataset.follow;

      let lsItems = getLS();

      if (value === 'false') {
         lsItems.push(data);
         setFollow(true);
         toast.success(`Ad has been added to watchlist`);
      } else {
         lsItems = lsItems.filter((value) => value?._id !== _id);

         setFollow(false);
         toast.success(`You stopped following the selected ad`);
      }

      localStorage.setItem('car__ads', JSON.stringify(lsItems));
   };

   return (
      <>
         <div className='flex items-center justify-between my-4 w-[20em]'>
            <p className='first-letter:uppercase'>{formatTime(created)}</p>
            <FollowButton
               item={data}
               handleFollow={handleFollow}
               follow={follow}
               position='xl:absolute top-4 right-24'
            />
         </div>
         <h2 className='font-semibold text-xl first-letter:uppercase py-4'>Details:</h2>
         <table className='text-left lg:w-3/4 w-full'>
            <tbody>
               {Object.entries(resDataCopy).map(([key, value]) => (
                  <tr key={key}>
                     <th className='py-4 w-2/5 first-letter:uppercase'>{key}:</th>
                     <td className='py-4 w-3/5 first-letter:uppercase'>{value}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
}

export default OfferDetils;
