import { useGlobalContext } from 'context';
import useAxiosPrivate from 'infrastructure/Auth/useAxiosPrivate';

const useGetTasks = () => {
  const { C, dispatch } = useGlobalContext();
  const { axiosPrivate } = useAxiosPrivate();
  const controller = new AbortController();
  let isMounted = true;

  const getTasks = async () => {
    try {
      const response = await axiosPrivate.get(`/tasks`, { signal: controller.signal });
      isMounted && dispatch({ type: C.GET_ALL_TASKS, payload: response.data.tasks });
    } catch (error) {
      console.log(error);
    }
  };

  return { controller, isMounted, getTasks };
};

export default useGetTasks;
