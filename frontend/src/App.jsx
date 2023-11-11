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

function App() {
   return (
      <main className='max-w-screen-2xl mx-auto min-h-screen relative pb-24'>
         <BrowserRouter>
            <Routes>
               <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route path='followed' element={<Followed />} />
                  <Route path='offer/:id' element={<Offer />} />
                  <Route element={<ProtectedRoutes />}>
                     <Route path='/new-announcement' element={<NewAnnouncement />} />
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
