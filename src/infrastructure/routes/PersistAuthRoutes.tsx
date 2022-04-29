import { useEffect, useState } from 'react';
import { useGlobalContext } from 'context';
import { Outlet } from 'react-router-dom';
import useRefreshAuth from 'infrastructure/Auth/useRefreshAuth';
import useAuth from 'infrastructure/Auth/useAuth';

const PersistAuthRoutes = () => {
  const { toLocalStorage } = useGlobalContext();
  const [isLoading, setIsloading] = useState(true);
  const { refresh } = useRefreshAuth();
  const { isAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const checkRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsloading(false);
      }
    };

    !isAuth()?.token ? checkRefreshToken() : setIsloading(false);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{!toLocalStorage.trustDevice ? <Outlet /> : isLoading ? <div>Loading...</div> : <Outlet />}</>
  );
};

export default PersistAuthRoutes;
