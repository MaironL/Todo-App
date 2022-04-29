import { axiosPrivate } from 'infrastructure/api/axios';
import { useEffect } from 'react';
import useRefreshAuth from './useRefreshAuth';
import useAuth from './useAuth';

interface Iconfig {
  headers?: any;
}
//* this hook use the token privatly in al the request made with the custom
//* axiosPrivate and if the token is expired, it will refresh the token
//* and then make the request again.

const useAxiosPrivate = () => {
  const { isAuth } = useAuth();
  const { refresh } = useRefreshAuth();

  useEffect(() => {
    //* this will give every request the access token
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: Iconfig) => {
        if (!config.headers['Authorization']) {
          const accessToken = isAuth()?.token;
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      }, // intercept the request
      (error) => {
        return Promise.reject(error);
      } // intercept the response
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, // success
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.send) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth().token, refresh]);

  return { axiosPrivate };
};

export default useAxiosPrivate;
