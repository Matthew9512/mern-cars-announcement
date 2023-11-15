import { useState } from 'react';
import UsersNavbar from './components/UsersNavbar';
import LoadingButton from '../../ui/LoadingButton';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Empty from '../../ui/Empty';
import { useDeleteUser, useGetUser, useLogout } from '../../api/useAuth';
import Modal from '../../ui/Modal';

function User() {
   const [display, setDisplay] = useState(false);
   const { data, isLoading, error } = useGetUser();
   const { logout, logoutLoading } = useLogout();
   const { deleteAcc, deleteLoading } = useDeleteUser();

   return (
      <section className='bg-secondary-white pt-8 min-h-[85vh]  relative'>
         {/* <section className='bg-secondary-white pt-8 min-h-[16em]  relative'> */}
         <UsersNavbar />
         <Modal display={display} setDisplay={setDisplay} item='account' fetchQuery={deleteAcc} params={null} />
         {isLoading && <LoadingSpinner />}
         {data ? (
            <div className='text-center space-y-4 space-x-4'>
               <p>username: {data?.username}</p>
               <p>email: {data?.email}</p>
               <p>joined: {new Date(data?.created).toLocaleDateString('en-GB')}</p>
               <LoadingButton isLoading={logoutLoading} onClick={() => setDisplay(true)}>
                  Delete account
               </LoadingButton>
               <LoadingButton isLoading={deleteLoading} onClick={logout}>
                  Log out
               </LoadingButton>
            </div>
         ) : (
            <div className='text-center mt-8 space-y-4'>
               <Empty resourceName='user'>
                  <p>No users data available</p>
               </Empty>
            </div>
         )}
      </section>
   );
}

export default User;
