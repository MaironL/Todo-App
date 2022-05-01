import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAxiosPrivate from 'infrastructure/Auth/useAxiosPrivate';
import { useGlobalContext } from 'context';

const useModifyList = () => {
  const MySwal = withReactContent(Swal);
  const { axiosPrivate } = useAxiosPrivate();
  const { dispatch, C, tasksList } = useGlobalContext();

  const updateTask = (id: string) => {
    const task = tasksList.find((toUpdate) => toUpdate._id === id);
    MySwal.fire({
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: <h3 className='font-bold mb-2'>Are you sure you want to update this task</h3>,
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed && result.value.trim() !== '') {
        axiosPrivate
          .patch(`/tasks/${id}`, { ...task, task: result.value })
          .then((response) => {
            if (response) {
              dispatch({ type: C.UPDATE_TASK });
            }
          })
          .then(() => {
            MySwal.fire({
              toast: true,
              icon: 'success',
              title: 'You succesfully updated the selected task',
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

  const checkingTask = (id: string) => {
    const task = tasksList.find((toCheck) => toCheck._id === id);
    MySwal.fire({
      width: 'min(90%, 370px)',
      padding: '1rem 10px',
      toast: true,
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: (
        <h3 className='font-bold mb-2'>
          Are you sure you want to {task?.isCheck === false ? 'check' : 'uncheck'} this task?
        </h3>
      ),
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: `Yes, ${task?.isCheck === false ? 'checkit!' : 'uncheck it!'}`,
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .patch(`/tasks/${id}`, { ...task, isCheck: !task?.isCheck })
          .then((response) => {
            if (response) {
              dispatch({ type: C.UPDATE_TASK });
            }
          })
          .then(() => {
            MySwal.fire({
              toast: true,
              icon: 'success',
              title: 'You succesfully check the selected task',
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

  const deleteTask = (id: string) => {
    MySwal.fire({
      width: 'min(90%, 370px)',
      padding: '1rem 10px',
      toast: true,
      icon: 'question',
      iconColor: 'rgb(107, 33, 168, 0.6)',
      background: 'rgb(255, 255, 255, 0.85)',
      html: <h3 className='font-bold mb-2'>Are you sure you want to delete this task</h3>,
      showCancelButton: true,
      confirmButtonColor: 'rgba(80, 160, 34, 0.9)',
      cancelButtonColor: 'rgba(198, 36, 36, 0.85)',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .delete(`/tasks/${id}`)
          .then((response) => {
            if (response) {
              dispatch({ type: C.DELETE_TASK });
            }
          })
          .then(() => {
            MySwal.fire({
              toast: true,
              icon: 'success',
              title: 'You succesfully delete the selected task',
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

  return { updateTask, deleteTask, checkingTask };
};

export default useModifyList;
