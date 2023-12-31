import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './context/userContext.jsx';
import { MessagesContextProvider } from './context/messagesContext.jsx';
import App from './App.jsx';
import './index.css';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 1,
         refetchOnWindowFocus: false,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <UserContextProvider>
            <MessagesContextProvider>
               <App />
            </MessagesContextProvider>
         </UserContextProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
