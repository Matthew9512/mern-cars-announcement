import Input from '../../../ui/Input';
import UsersNavbar from './UsersNavbar';
import { useGetUser, useUpdateUserData } from '../../../api/useAuth';
import LoadingButton from '../../../ui/LoadingButton';

function UsersPersonalData() {
   const { data: user, error } = useGetUser();
   const { mutateUserData, isPending } = useUpdateUserData();

   const handleSubmitForm = (e) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form);

      mutateUserData(formData);
   };

   return (
      <section className='pt-7 bg-secondary-white min-h-[85vh]'>
         <UsersNavbar />
         <form onSubmit={handleSubmitForm} className='flex-center flex-col gap-4 '>
            <span className='font-semibold text-xl py-2'>Seller details</span>
            <label htmlFor='city'>City:</label>
            <Input type='text' placeholder='city' name='city' id='city' defaultValue={user?.city} />
            <label htmlFor='contact person'>Contact person:</label>
            <Input
               type='text'
               placeholder='contact person'
               name='contactPerson'
               id='contact person'
               defaultValue={user?.contactPerson}
            />
            <label htmlFor='tel number'>Tel number:</label>
            <Input
               type='tel'
               placeholder='tel number'
               name='telNumber'
               id='tel number'
               defaultValue={user?.telNumber}
            />
            <LoadingButton isLoading={isPending} className='mx-auto mt-4'>
               Create
            </LoadingButton>
         </form>
      </section>
   );
}

export default UsersPersonalData;
{
   /* <section className='flex-center bg-secondary-white'> */
}
