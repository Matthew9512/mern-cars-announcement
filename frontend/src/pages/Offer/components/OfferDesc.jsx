/**
 * @todo ugly dest
 */

import { formatRelative } from 'date-fns';
import { heartIconOutline, heartIconFilled } from '../../../utils/icons';
import { formatResData, getLS } from '../../../utils/helpers';
import { useState } from 'react';

function OfferDetils({ data }) {
   const { images, _id, __v, created, seller, features, ...resData } = data;
   const [follow, setFollow] = useState(() => {
      const lsItems = getLS();

      const findItem = lsItems.find((value) => value._id === _id);
      return findItem ? true : false;
   });
   const resDataCopy = formatResData(resData);

   const handleFollow = (e) => {
      const value = e.currentTarget.dataset.follow;

      let lsItems = getLS();

      if (value === 'false') {
         lsItems.push(data);
         setFollow(true);
      } else {
         lsItems = lsItems.filter((value) => value?._id !== _id);

         setFollow(false);
      }

      localStorage.setItem('car__ads', JSON.stringify(lsItems));
   };

   return (
      <>
         <div className='flex justify-between my-4 w-[20em]'>
            <p className='first-letter:uppercase'>
               {formatRelative(new Date(created), new Date(), { addSuffix: true })}
            </p>
            <div
               onClick={handleFollow}
               data-follow={follow}
               className='xl:absolute flex-center top-4 right-0 gap-2 border-b hover:cursor-pointer hover:opacity-70'
            >
               <span>{follow ? heartIconFilled : heartIconOutline}</span>
               <p>{follow ? 'unfollow' : 'follow'}</p>
            </div>
         </div>
         <h2 className='font-semibold text-xl first-letter:uppercase py-4'>Details:</h2>
         <table className='text-left lg:w-3/4 w-full'>
            <tbody>
               {Object.entries(resDataCopy).map(([key, value]) => (
                  // {Object.entries(resData).map(([key, value]) => (
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
