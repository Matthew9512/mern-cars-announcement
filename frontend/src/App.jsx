import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Layout from './ui/Layout';
import ProtectedRoutes from './ui/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import NewAnnouncement from './pages/NewAnnouncement/NewAnnouncement';
import Offer from './pages/Offer/Offer';
import PageNotFound from './pages/PageNotFound';
import ServerDown from './pages/ServerDown';
import Followed from './pages/Followed';
import User from './pages/User/User';
import UsersAnnouncement from './pages/User/components/UsersAnnouncement';
import UsersPersonalData from './pages/User/components/UsersPersonalData';
import Messenger from './pages/User/components/Messenger';

// pb-24
function App() {
   return (
      <main className='max-w-screen-2xl mx-auto min-h-screen relative'>
         <BrowserRouter>
            <Routes>
               <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route path='followed' element={<Followed />} />
                  <Route path='offer/:id' element={<Offer />} />
                  <Route element={<ProtectedRoutes />}>
                     <Route path='new-announcement' element={<NewAnnouncement />} />
                     <Route path='user' element={<User />} />
                     <Route path='user/announcements' element={<UsersAnnouncement />} />
                     <Route path='user/users-data' element={<UsersPersonalData />} />
                     <Route path='user/messages' element={<Messenger />} />
                     <Route path='user/messages/:id' element={<Messenger />} />
                  </Route>
               </Route>
               <Route path='*' element={<PageNotFound />} />
               <Route path='server-down' element={<ServerDown />} />
            </Routes>
         </BrowserRouter>

         <Toaster
            toastOptions={{
               success: {
                  duration: 2500,
               },
            }}
         />
      </main>
   );
}

export default App;
