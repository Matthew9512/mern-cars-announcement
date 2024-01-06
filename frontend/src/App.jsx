import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';

const Home = lazy(() => import('./pages/Home/Home'));
const Layout = lazy(() => import('./ui/Layout'));
const ProtectedRoutes = lazy(() => import('./ui/ProtectedRoutes'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NewAnnouncement = lazy(() => import('./pages/NewAnnouncement/NewAnnouncement'));
const Offer = lazy(() => import('./pages/Offer/Offer'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const ServerDown = lazy(() => import('./pages/ServerDown'));
const Followed = lazy(() => import('./pages/Followed'));
const User = lazy(() => import('./pages/User/User'));
const UsersAnnouncement = lazy(() => import('./pages/User/components/UsersAnnouncement'));
const UsersPersonalData = lazy(() => import('./pages/User/components/UsersPersonalData'));
const Messenger = lazy(() => import('./pages/User/components/Messenger'));
const Features = lazy(() => import('./pages/Features'));

function App() {
   return (
      <main className='max-w-screen-2xl mx-auto min-h-screen relative'>
         <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
               <Routes>
                  <Route element={<Layout />}>
                     <Route path='/' element={<Home />} />
                     <Route path='features' element={<Features />} />
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
            </Suspense>
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
