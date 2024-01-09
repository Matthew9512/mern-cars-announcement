import Button from '../../../ui/Button';

function DefaultLogin({ login }) {
   return (
      <div className='absolute top-0 right-4 p-4 rounded-lg flex flex-col items-center backdrop-blur-lg border border-secondary-grey'>
         <p>Use default testing values:</p>
         <Button
            variant='primary'
            className='my-4 w-max'
            onClick={() =>
               login({
                  password: import.meta.env.VITE_EWA_PASSWORD,
                  email: import.meta.env.VITE_EWA_EMAIL,
               })
            }
         >
            Login as Ewa
         </Button>
         <Button
            variant='primary'
            className='my-4 w-max'
            onClick={() =>
               login({
                  password: import.meta.env.VITE_ADAM_PASSWORD,
                  email: import.meta.env.VITE_ADAM_EMAIL,
               })
            }
         >
            Login as Adam
         </Button>
      </div>
   );
}

export default DefaultLogin;
