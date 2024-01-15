import { createContext } from 'react';
import { useGetUser } from '../api/useAuth';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
   const { data: user, isPending, error } = useGetUser();

   return <UserContext.Provider value={{ user: user?.user, isPending, error }}>{children}</UserContext.Provider>;
};
