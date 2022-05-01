import axios from 'axios';

//* Just a axios with the api root endpoint
//* use it for public endpoints
export default axios.create({
  baseURL: process.env.REACT_APP_ROOT_ENDPOINT,
});

//* apart of the api root endpoint, comes with the credential to work
//* with the cookie. And it´s use too with the useAxiosPrivate hook
//* for privatly send the token.
export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_ROOT_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
