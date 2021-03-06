import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAxiosPrivate from 'infrastructure/Auth/useAxiosPrivate';
import { useGlobalContext } from 'context';

const useAddNewTask = () => {
  const { axiosPrivate } = useAxiosPrivate();
  const MySwal = withReactContent(Swal);
  const { dispatch, C } = useGlobalContext();

  const addTask = (taskWrited: string) => {
    MySwal.fire({
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: (
        <div className='flex flex-col'>
          <h3 className='font-bold mb-2'>Are you sure you want to add this task</h3>
          <p className='text-center text-xl'>{taskWrited}</p>
        </div>
      ),
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!',
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed && taskWrited.trim() !== '') {
        const data = {
          task: taskWrited,
        };

        axiosPrivate
          .post(`/tasks`, data)
          .then((response) => {
            if (response) {
              dispatch({ type: C.ADD_NEW_TASK });
            }
          })
          .then(() => {
            MySwal.fire({
              toast: true,
              icon: 'success',
              title: 'You succesfully added a new task',
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
      } else if (result.isConfirmed && taskWrited.trim() === '') {
        MySwal.fire({
          toast: true,
          icon: 'error',
          title: 'You must write a task!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  return { addTask };
};

export default useAddNewTask;
