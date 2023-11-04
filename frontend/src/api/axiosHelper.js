import jwtDecode from 'jwt-decode';
import { axiosCredentials, fetchData } from '../api/fetchData';

axiosCredentials.interceptors.request.use(
   async (config) => {
      const token = await getToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      } else {
         const newToken = await refreshAccessToken();
         config.headers.Authorization = `Bearer ${newToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export function getToken() {
   const token = JSON.parse(localStorage.getItem('car-access__token'));
   if (token) {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
         // Access token has expired
         removeToken();
         return null;
      }
   }
   return token;
}

export function removeToken() {
   localStorage.removeItem('car-access__token');
}

async function refreshAccessToken() {
   try {
      const res = await fetchData({
         url: `/users/refresh`,
         method: 'POST',
         withCredentials: true,
      });

      const newToken = await res.accessToken;
      localStorage.setItem('car-access__token', JSON.stringify(newToken));
      return newToken;
   } catch (error) {
      window.location = '/';
   }
}

export function jwtDecodeToken() {
   const token = localStorage.getItem('car-access__token')
      ? JSON.parse(localStorage.getItem('car-access__token'))
      : null;
   let decoded;
   if (token) {
      decoded = jwtDecode(token);
   }
   //   } else window.location = '/';
   return decoded;
}
