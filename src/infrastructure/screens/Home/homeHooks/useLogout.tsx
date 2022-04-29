import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'infrastructure/api/axios';
import { useGlobalContext } from 'context';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const MySwal = withReactContent(Swal);
  const { dispatch, C, toLocalStorage } = useGlobalContext();
  const navigate = useNavigate();

  const logout = () => {
    MySwal.fire({
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: (
        <div className='flex flex-col'>
          <h3 className='font-bold mb-2'>Are you sure you want to logout</h3>
        </div>
      ),
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, cancel!',
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: C.LOGOUT });

        axios
          .get('/renewalAuthN/logout', {
            withCredentials: true,
          })
          .then(() => {
            navigate('/signIn');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return { logout };
};

export default useLogout;
