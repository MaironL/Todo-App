import { useGlobalContext } from 'context';

const useAuth = () => {
  const { userAuth } = useGlobalContext();

  const isAuth = () => {
    const user = {
      loggedIn: userAuth?.token ? userAuth : { token: '', name: '', role: '' },
    };
    return user && user.loggedIn;
  };

  return { isAuth };
};

export default useAuth;
