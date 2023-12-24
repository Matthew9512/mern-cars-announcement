import { useContext, useState } from 'react';
import UsersNavbar from './components/UsersNavbar';
import LoadingButton from '../../ui/LoadingButton';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Empty from '../../ui/Empty';
import { useDeleteUser, useLogout } from '../../api/useAuth';
import Modal from '../../ui/Modal';
import { UserContext } from '../../context/userContext';

function User() {
   const [display, setDisplay] = useState(false);
   const { user, isPending, error } = useContext(UserContext);
   const { logout, logoutLoading } = useLogout();
   const { deleteAcc, deleteLoading } = useDeleteUser();

   return (
      <section className='bg-secondary-white pt-8 min-h-[85vh] relative'>
         <UsersNavbar />
         <Modal
            display={display}
            setDisplay={setDisplay}
            item='account'
            action='delete'
            fetchQuery={deleteAcc}
            params={null}
         />
         {isPending && <LoadingSpinner />}
         {user ? (
            <div className='text-center space-y-4 space-x-4'>
               <p>username: {user?.username}</p>
               <p>email: {user?.email}</p>
               <p>joined: {new Date(user?.created).toLocaleDateString('en-GB')}</p>
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
