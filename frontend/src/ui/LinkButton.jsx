import { Link } from 'react-router-dom';
import Button from './Button';

function LinkButton({ children, to, variant, ...props }) {
   return (
      <Link to={to}>
         <Button variant={variant} {...props}>
            {children}
         </Button>
      </Link>
   );
}

export default LinkButton;
