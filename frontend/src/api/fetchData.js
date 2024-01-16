import axios from 'axios';

export const _URL = `https://mern-cars-announcement-production.up.railway.app/`;

axios.defaults.baseURL = _URL;
axios.defaults.withCredentials = true;

export const axiosCredentials = axios.create();

export async function fetchData(options, auth = false) {
   const axiosOptions = auth ? axiosCredentials : axios;
   try {
      const res = await axiosOptions.request(options);
      const data = await res.data;
      return data;
   } catch (error) {
      if (error.request.status === 0) return (window.location.href = '/server-down');
      throw new Error(error.response.data.message);
   }
}
