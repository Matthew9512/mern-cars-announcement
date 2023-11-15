import { createPortal } from 'react-dom';
import Button from './Button';

function Modal({ display, setDisplay, item, fetchQuery, params }) {
   return createPortal(
      <div
         className={`fixed inset-0 bg-primary-black/40 backdrop-blur-sm flex items-center justify-center flex-col z-50 ${
            !display && 'hidden'
         }`}
      >
         <div className='relative w-96 h-48 p-6 bg-primary-white shadow-2xl rounded-md overflow-auto flex gap-2 flex-col'>
            <p className='text-left font-semibold text-lg'>Delete {item}</p>
            <p className='text-left'>
               Are you sure that you want to delete this {item}? This action can&apos;t be undone?
            </p>
            <div className='absolute right-4 bottom-6 flex gap-4'>
               <Button variant='primary' onClick={() => setDisplay((prev) => !prev)}>
                  Cancel
               </Button>
               <Button
                  variant='primary'
                  onClick={() => {
                     fetchQuery({ ...params });
                     setDisplay((prev) => !prev);
                  }}
               >
                  Confirm
               </Button>
            </div>
         </div>
      </div>,
      document.getElementById('modal-root')
   );
}

export default Modal;
// import { createPortal } from 'react-dom';

// function Modal({ children }) {
//    return createPortal(
//       <div className='fixed inset-0 bg-primary-black'>{children}</div>,
//       document.querySelector('#modal-root')
//    );
// }

// export default Modal;
