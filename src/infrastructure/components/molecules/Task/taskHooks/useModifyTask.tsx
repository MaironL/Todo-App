import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useGlobalContext } from 'context';

const useModifyList = () => {
  const MySwal = withReactContent(Swal);
  const { dispatch, C, toLocalStorage } = useGlobalContext();

  const updateTask = (id: string) => {
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
        //crear logica para actulizar el item a la API Rest
        //tal vez una accion
        dispatch({ type: C.UPDATE_TASK, payload: { id, updated: result.value } });
        MySwal.fire({
          toast: true,
          icon: 'success',
          title: 'You succesfully updated the task',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  const checkingTask = (id: string) => {
    const task = toLocalStorage.tasks.find((toDelete) => toDelete.id === id);
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
        //crear logica para actulizar el item a la API Rest
        //tal vez una accion
        dispatch({ type: C.CHECKIN, payload: id });
        MySwal.fire({
          toast: true,
          icon: 'success',
          title: 'You succesfully checked the task',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
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
        //crear logica para borrar el item a la API Rest
        //tal vez una accion
        dispatch({ type: C.DELETE_TASK, payload: id });
        MySwal.fire({
          toast: true,
          icon: 'success',
          title: 'You succesfully deleted the task',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  return { updateTask, deleteTask, checkingTask };
};

export default useModifyList;
