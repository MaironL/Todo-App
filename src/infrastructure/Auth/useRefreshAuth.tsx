import { useGlobalContext } from 'context';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'infrastructure/api/axios';

const useRefreshAuth = () => {
  const { C, dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await axios.get('/renewalAuthN', {
        withCredentials: true,
      });

      dispatch({
        type: C.GET_USER_AUTH,
        payload: {
          token: response.data.accessToken,
          name: response.data.user.name,
          role: Object.keys(response.data.user.role)[0],
        },
      });

      return response.data.accessToken;
    } catch (error) {
      navigate('/signIn', { state: { from: location }, replace: true });
    }
  };

  return { refresh };
};

export default useRefreshAuth;
