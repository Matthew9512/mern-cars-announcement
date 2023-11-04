import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Layout from './ui/Layout';
import ProtectedRoutes from './ui/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import NewAnnouncement from './pages/NewAnnouncement/NewAnnouncement';

function App() {
   return (
      <main className='max-w-screen-2xl mx-auto min-h-screen relative'>
         <BrowserRouter>
            <Routes>
               <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route element={<ProtectedRoutes />}>
                     <Route path='/new-announcement' element={<NewAnnouncement />} />
                  </Route>
               </Route>
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
