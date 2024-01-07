import Input from '../ui/Input';
import LinkButton from '../ui/LinkButton';
import { carIcon } from '../utils/icons';
import { useRegister } from '../api/useAuth';
import LoadingButton from '../ui/LoadingButton';

function Register() {
   const { mutate, isPending } = useRegister();

   const handleRegister = (e) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form);

      mutate(formData);
   };

   return (
      <section className='flex-center h-[90vh]'>
         <form
            onSubmit={handleRegister}
            className='bg-secondary-white w-[420px] rounded-lg flex-center flex-col py-12 gap-4'
         >
            <p className='flex-center gap-2 text-3xl py-6'>{carIcon} JustCars</p>
            <div className='flex items-start flex-col gap-4'>
               <label className='opacity-70 italic'>your username</label>
               <Input type='text' placeholder='username' name='username' />
               <label className='opacity-70 italic'>email adress:</label>
               <Input type='email' placeholder='email' name='email' />
               <label className='opacity-70 italic'>your password</label>
               <Input type='password' placeholder='password' name='password' />
            </div>
            <LoadingButton isLoading={isPending} className='my-4'>
               Register
            </LoadingButton>
            <LinkButton to='/login'>
               <p className='opacity-70'>
                  Have an account?
                  <span className='ml-2 underline'>Log In</span>
               </p>
            </LinkButton>
         </form>
      </section>
   );
}

export default Register;
