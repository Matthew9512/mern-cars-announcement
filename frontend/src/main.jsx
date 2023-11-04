import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnMount: false,
         refetchOnWindowFocus: false,
         staleTime: Infinity,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
         <ReactQueryDevtools buttonPosition='bottom-left' />
      </QueryClientProvider>
   </React.StrictMode>
);
