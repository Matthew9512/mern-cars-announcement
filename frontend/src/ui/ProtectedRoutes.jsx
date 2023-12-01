import { Outlet, Navigate } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext';

function ProtectedRoutes() {
   const token = localStorage.getItem('car-access__token') || null;
   if (!token) return <Navigate to='/' />;

   return (
      <UserContextProvider>
         <Outlet />
      </UserContextProvider>
   );
   // return <Outlet />;
}

export default ProtectedRoutes;
