import { carIcon } from '../utils/icons';
import Input from '../ui/Input';
import LinkButton from '../ui/LinkButton';
import LoadingButton from '../ui/LoadingButton';
import { useLogin } from '../api/useAuth';
import DefaultLogin from './User/components/defaultLogin';

function Login() {
   const { mutate, isPending } = useLogin();

   const handleLogin = (e) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form);

      mutate(formData);
   };

   return (
      <section className='flex-center h-[90vh] relative'>
         <DefaultLogin login={mutate} />
         <form
            onSubmit={handleLogin}
            className='bg-secondary-white w-[420px] rounded-lg flex-center flex-col py-12 gap-4'
         >
            <p className='flex-center gap-2 text-3xl py-6'>{carIcon} JustCars</p>
            <div className='flex items-start flex-col gap-4'>
               <label className='opacity-70 italic'>email adress:</label>
               <Input type='email' placeholder='email' name='email' />
               <label className='opacity-70 italic'>your password</label>
               <Input type='password' placeholder='password' name='password' />
            </div>
            <LoadingButton isLoading={isPending} className='my-4'>
               Login
            </LoadingButton>
            <LinkButton to='/register'>
               <p className='opacity-70'>
                  Don&apos;t have an account?
                  <span className='ml-2 underline'>Sign Up</span>
               </p>
            </LinkButton>
         </form>
      </section>
   );
}

export default Login;
