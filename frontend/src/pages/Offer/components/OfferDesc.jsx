/**
 * @todo ugly dest
 */

import { formatRelative } from 'date-fns';
import { heartIcon } from '../../../utils/icons';

function OfferDetils({ data }) {
   const { images, _id, __v, created, seller, features, ...resData } = data;

   return (
      <>
         <div className='flex justify-between my-4 w-[20em]'>
            <p className='first-letter:uppercase'>
               {formatRelative(new Date(data?.created), new Date(), { addSuffix: true })}
            </p>
            <div className='xl:absolute flex-center top-4 right-0 gap-2 border-b hover:cursor-pointer hover:opacity-70'>
               <span>{heartIcon}</span>
               <p>Follow</p>
            </div>
         </div>
         <h2 className='font-semibold text-xl first-letter:uppercase py-4'>Details:</h2>
         <table className='text-left lg:w-3/4 w-full'>
            <tbody>
               {Object.entries(resData).map(([key, value]) => (
                  <tr key={key}>
                     <th className='py-4 w-2/5'>{key}:</th>
                     <td className='py-4 w-3/5'>{value}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
}

export default OfferDetils;

//  <table className='grid lg:w-3/4 w-full grid-cols-2'>
{
   /* <thead>
<tr className='flex flex-col text-left'>
   {Object.keys(resData).map((key) => (
      <th key={key} className='my-4'>
         {key}:
      </th>
   ))}
</tr>
</thead>
<tbody>
<tr className='flex flex-col text-left'>
   {Object.values(resData).map((value) => (
      <td key={value} className='my-4'>
         {value}
      </td>
   ))}
</tr>
</tbody>
</table> */
}
//====================================
// /**
//  * @todo ugly dest
//  */

// import { formatRelative } from 'date-fns';
// import { heartIcon } from '../../../utils/icons';

// function OfferDetils({ data }) {
//    const { images, _id, __v, created, seller, features, ...resData } = data;

//    return (
//       <>
//          <div className='flex justify-between my-4 w-[20em]'>
//             <p className='first-letter:uppercase'>
//                {formatRelative(new Date(data?.created), new Date(), { addSuffix: true })}
//             </p>
//             <div className='xl:absolute flex-center top-4 right-0 gap-2 border-b hover:cursor-pointer hover:opacity-70'>
//                <span>{heartIcon}</span>
//                <p>Follow</p>
//             </div>
//          </div>
//          <h2 className='font-semibold text-xl first-letter:uppercase py-4'>Details:</h2>
//          <div className='grid lg:w-3/4 w-full grid-cols-2'>
//             <div>
//                {Object.keys(resData).map((key) => (
//                   <p key={key} className='my-4'>
//                      {key}:
//                   </p>
//                ))}
//             </div>
//             <div>
//                {Object.values(resData).map((value) => (
//                   <p key={value} className='my-4'>
//                      {value}
//                   </p>
//                ))}
//             </div>
//          </div>
//       </>
//    );
// }

// export default OfferDetils;
