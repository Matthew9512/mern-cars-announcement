import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

function Modal({ searchParams, setSearchParams, children }) {
   console.log(searchParams);
   return createPortal(
      <div className='fixed inset-0 bg-primary-black'>{children}</div>,
      document.querySelector('#modal-root')
   );
}

export default Modal;
