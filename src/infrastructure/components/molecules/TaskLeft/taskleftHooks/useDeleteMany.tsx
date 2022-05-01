import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAxiosPrivate from 'infrastructure/Auth/useAxiosPrivate';
import { useGlobalContext } from 'context';

const useDeleteMany = () => {
  const MySwal = withReactContent(Swal);
  const { axiosPrivate } = useAxiosPrivate();
  const { dispatch, C } = useGlobalContext();

  const deleteTasks = () => {
    MySwal.fire({
      width: 'min(90%, 370px)',
      padding: '1rem 10px',
      toast: true,
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: <h3 className='font-bold mb-2'>Are you sure you want to all completed tasks</h3>,
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .delete(`/tasks`)
          .then((response) => {
            if (response) {
              dispatch({ type: C.DELETE_TASK });
            }
          })
          .then(() => {
            MySwal.fire({
              toast: true,
              icon: 'success',
              title: 'You succesfully deleted all completed tasks',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          })
          .catch((error) => {
            console.log(error);
            MySwal.fire({
              toast: true,
              icon: 'error',
              title: 'something went wrong',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          });
      }
    });
  };

  return { deleteTasks };
};

export default useDeleteMany;
