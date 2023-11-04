import { loadingSpinnerIcon } from '../utils/icons';
import Button from './Button';

function LoadingButton({ isLoading, className, children, ...props }) {
   return (
      <>
         {isLoading ? (
            <Button variant='primary' className={`flex-center ${className}`}>
               {loadingSpinnerIcon} <span className='pl-3'>Loading...</span>
            </Button>
         ) : (
            <Button variant='primary' className={className} {...props}>
               {children}
            </Button>
         )}
      </>
   );
}

export default LoadingButton;
